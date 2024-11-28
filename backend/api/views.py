from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from gradio_client import Client, handle_file
from django.core.files.storage import default_storage

from django.conf import settings
import os
import shutil
import re

from rest_framework.permissions import AllowAny

def sanitize_filename(name):
    # Replace any invalid characters with underscores
    return re.sub(r'[^\w\-_\.]', '_', name)

class ImageRestoreView(APIView):
    parser_classes = [MultiPartParser, FormParser]  # To handle file uploads
    permission_classes = [AllowAny]  # Allow any user to access the view

    def post(self, request, *args, **kwargs):
        # Check if an image file is provided
        image_file = request.FILES.get('image')
        if not image_file:
            return Response({"error": "No image file provided."}, status=status.HTTP_400_BAD_REQUEST)

        # Save the file temporarily
        file_path = default_storage.save(image_file.name, image_file)

        try:
            # Instantiate Gradio client
            client = Client("sczhou/CodeFormer")

            # Send the image to the Gradio client
            result = client.predict(
                image=handle_file(default_storage.path(file_path)),  # Pass the local file path
                face_align=True,
                background_enhance=True,
                face_upsample=True,
                upscale=2,
                codeformer_fidelity=0.5,
                api_name="/predict",
            )
            temp_file_path = result[0] if isinstance(result, tuple) else result
            
            print(f"Temporary file path: {temp_file_path}")
            if not os.path.exists(temp_file_path):
                return {"error": f"Temp file not found: {temp_file_path}"}

            # Define the media folder where the images will be stored
            media_folder = os.path.join(settings.MEDIA_ROOT, "restored_images")
            os.makedirs(media_folder, exist_ok=True)

            # Generate the final file name using the original image name (sanitized)
            final_file_name = sanitize_filename(f"{os.path.splitext(image_file.name)[0]}.webp")
            final_path = os.path.join(media_folder, final_file_name)
            print(f"Final save path: {final_path}")

            # Copy the restored file to the media folder
            shutil.copy(temp_file_path, final_path)
            
            # Return the URL of the saved image
            return Response({
                "image_url": f"{settings.MEDIA_URL}restored_images/{final_file_name}"
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            # Clean up the temporary file
            default_storage.delete(file_path)
