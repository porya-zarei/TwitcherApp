global using System;
global using System.Collections.Generic;
global using System.Linq;
global using System.Text;
global using System.Threading.Tasks;
global using System.ComponentModel.DataAnnotations;
global using Microsoft.EntityFrameworkCore;
global using MediatR;
global using System.ComponentModel.DataAnnotations.Schema;
global using Microsoft.AspNetCore.Http;
global using Microsoft.AspNetCore.Hosting;
global using Microsoft.AspNetCore.Hosting.Builder;
global using Microsoft.AspNetCore.WebUtilities;
global using System.Text.Json.Serialization;
global using Microsoft.AspNetCore.SignalR;

global using API.DataLayer.Models;
global using API.DataLayer.Interfaces;
global using API.DataLayer.Services;
global using API.DataLayer.Contexts;
global using API.DataLayer.DTOs;
global using API.DataLayer.Hubs.Users;

global using API.Utils.Upload;
global using API.Utils;
global using API.Utils.Helpers;
