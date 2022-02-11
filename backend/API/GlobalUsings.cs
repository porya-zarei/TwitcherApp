﻿global using System;
global using System.Text;
global using Microsoft.AspNetCore.Http;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.AspNetCore.Hosting;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.AspNetCore.Authentication.JwtBearer;
global using Microsoft.IdentityModel.Tokens;
global using MediatR;
global using System.Reflection;
global using Microsoft.Extensions.Options;
global using Microsoft.AspNetCore.Authorization;
global using Microsoft.OpenApi.Models;
global using Microsoft.AspNetCore.SignalR;


global using API.DataLayer.Contexts;
global using API.DataLayer.Models;
global using API.DataLayer.Commands.Auth;
global using API.DataLayer.Commands.Tweets;
global using API.DataLayer.Commands.Users;
global using API.DataLayer.Queries.Users;
global using API.DataLayer.DTOs;
global using API.Utils.Configs;
global using API.Utils.Auth;
global using API.DataLayer.Interfaces;
global using API.DataLayer.Services;
global using API.DataLayer.Queries.Tweets;