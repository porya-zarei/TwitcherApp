﻿using System.IO;

namespace API.Utils.Upload;

public class Uploader
{
    public static async Task<string?> UploadImage(IFormFile image, string webRootPath)
    {
        try
        {
            string uniquefilename = string.Empty;

            if (image != null)
            {
                string uploadFolder = Path.Combine(webRootPath, "files", "images");
                uniquefilename = Guid.NewGuid().ToString() + image.FileName;
                string filepath = Path.Combine(uploadFolder, uniquefilename);
                await using var fileStream = new FileStream(filepath, FileMode.Create);
                await image.CopyToAsync(fileStream);
                return uniquefilename;
            }
            else
            {
                return null;
            }
        }
        catch (Exception)
        {
            return null;
        }
    }

    public static async Task<List<string>?> UploadImages(IFormFile[]? images, string webRootPath)
    {
        try
        {
            if(images != null)
            {
                var imagesName = new List<string>();
                foreach (IFormFile image in images)
                {
                    string uniquefilename = string.Empty;

                    if (image != null)
                    {
                        string uploadFolder = Path.Combine(webRootPath, "files", "images");
                        uniquefilename = Guid.NewGuid().ToString() + image.FileName;
                        string filepath = Path.Combine(uploadFolder, uniquefilename);
                        await using var fileStream = new FileStream(filepath, FileMode.Create);
                        await image.CopyToAsync(fileStream);
                        imagesName.Add(uniquefilename);
                    }
                }
                return imagesName;
            }
            return null;
        }
        catch (Exception)
        {
            return null;
        }
    }

    public static async Task<string?> UploadImageWithPath(IFormFile image, string path, string webRootPath)
    {
        try
        {
            string uniquefilename = string.Empty;

            if (image != null)
            {
                string uploadFolder = Path.Combine(webRootPath, "files", "images", path);
                uniquefilename = Guid.NewGuid().ToString() + image.FileName;
                string filepath = Path.Combine(uploadFolder, uniquefilename);
                await using var fileStream = new FileStream(filepath, FileMode.Create);
                await image.CopyToAsync(fileStream);
                return uniquefilename;
            }
            else
            {
                return null;
            }
        }
        catch (Exception)
        {
            return null;
        }
    }

    public static async Task<string?> UploadVoice(IFormFile voice, string webRootPath)
    {
        try
        {
            string uniquefilename = string.Empty;

            if (voice != null)
            {
                string uploadFolder = Path.Combine(webRootPath, "files", "voices");
                uniquefilename = Guid.NewGuid().ToString() + voice.FileName;
                string filepath = Path.Combine(uploadFolder, uniquefilename);
                await using var fileStream = new FileStream(filepath, FileMode.Create);
                await voice.CopyToAsync(fileStream);
                return uniquefilename;
            }
            else
            {
                return null;
            }
        }
        catch (Exception)
        {
            return null;
        }
    }

    public static async Task<string?> UploadVideo(IFormFile? video, string webRootPath)
    {
        try
        {
            string uniquefilename = string.Empty;

            if (video != null)
            {
                string uploadFolder = Path.Combine(webRootPath, "files", "videos");
                uniquefilename = Guid.NewGuid().ToString() + video.FileName;
                string filepath = Path.Combine(uploadFolder, uniquefilename);
                await using var fileStream = new FileStream(filepath, FileMode.Create);
                await video.CopyToAsync(fileStream);
                return uniquefilename;
            }
            else
            {
                return null;
            }
        }
        catch (Exception)
        {
            return null;
        }
    }

    public static async Task<string?> UploadProfileImage(IFormFile image, string webRootPath)
    {
        try
        {
            string uniquefilename = string.Empty;

            if (image != null)
            {
                string uploadFolder = Path.Combine(webRootPath, "files", "images", "profiles");
                uniquefilename = Guid.NewGuid().ToString() + image.FileName;
                string filepath = Path.Combine(uploadFolder, uniquefilename);
                await using var fileStream = new FileStream(filepath, FileMode.Create);
                await image.CopyToAsync(fileStream);
                return uniquefilename;
            }
            else
            {
                return null;
            }
        }
        catch (Exception)
        {
            return null;
        }
    }

    public static async Task<bool> UploadFiles(List<IFormFile> files, string webRootPath)
    {
        try
        {
            foreach (var file in files)
            {
                string uniquefilename = string.Empty;

                if (file != null)
                {
                    string uploadFolder = Path.Combine(webRootPath, "files", "main");
                    uniquefilename = file.FileName;
                    string filepath = Path.Combine(uploadFolder, uniquefilename);
                    await using (var fileStream = new FileStream(filepath, FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }
                }
            }

            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    public static async Task<string?> UploadFile(IFormFile file, string webRootPath)
    {
        try
        {
            string uniquefilename = string.Empty;

            if (file != null)
            {
                string uploadFolder = Path.Combine(webRootPath, "files", "main");
                uniquefilename = Guid.NewGuid().ToString() + file.FileName;
                string filepath = Path.Combine(uploadFolder, uniquefilename);
                await using var fileStream = new FileStream(filepath, FileMode.Create);
                await file.CopyToAsync(fileStream);
                return uniquefilename;
            }
            else
            {
                return null;
            }
        }
        catch (Exception)
        {
            return null;
        }
    }
}