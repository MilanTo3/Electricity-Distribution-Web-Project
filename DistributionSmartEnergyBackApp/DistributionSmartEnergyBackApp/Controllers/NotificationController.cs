﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DistributionSmartEnergyBackApp.Models.EntityModels;
using DistributionSmartEnergyBackApp.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace DistributionSmartEnergyBackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {

        private readonly INotification _context;
        static int count = 0;
        public NotificationController(INotification context)
        {
            _context = context;
        }

        // GET: api/Notification/id
        [HttpGet("{id}")]
        [Route("GetNotification")]
        public async Task<NotificationModel> GetNotification(int id)
        {
            return await _context.GetNotification(id);
        }

        // GET: api/Notification/GetNotifications
        [HttpGet]
        [Route("GetNotifications")]
        public async Task<IEnumerable<NotificationModel>> GetNotifications()
        {
            return await _context.GetNotifications();
        }

        // GET: api/Notification/GetUserNotifications
        [HttpGet]
        [Route("GetUserNotifications")]
        public async Task<IEnumerable<NotificationModel>> GetUserNotifications(string username)
        {
            count++;
            Console.WriteLine(count);
            try
            {
                return await _context.GetUserNotif(username);

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // GET: api/Notification/GetUnreadNotifications
        [HttpGet]
        [Route("GetUnreadNotifications")]
        public async Task<IEnumerable<NotificationModel>> GetUnreadNotifications( string username)
        {
            count++;
            Console.WriteLine(count);
            try
            {
                return await _context.GetUnreadNotifications(username);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        // POST: api/Notification/AddNotification
        [HttpPost]
        [Route("AddNotification")]
        public async Task<IActionResult> AddNotification([FromForm]NotificationModel notification)
        {
            try
            {
                await _context.AddNotification(notification);
                return Ok();

            }
            catch
            {
                return BadRequest();
            }
        }

        // POST: api/Notification/MarkAsSeen
        [HttpPost]
        [Route("MarkAsSeen")]
        public async Task<IActionResult> MarkAsSeen([FromForm] string username)
        {
            try
            {
                await _context.MarkAsSeen(username);
                return Ok();

            }
            catch
            {
                return BadRequest();
            }
        }

        // POST: api/Notification/ClearAllNotifications
        [HttpPost]
        [Route("ClearAllNotifications")]
        public async Task<IActionResult> ClearAllNotifications([FromForm] string username)
        {
            try
            {
                await _context.ClearAllNotifications(username);
                return Ok();

            }
            catch
            {
                return BadRequest();
            }
        }
        //DELETE api/Notification/Delete/5
        [HttpPost("DeleteNotification")]
        public async Task DeleteNotification(int id)
        {
            try
            {
                await _context.DeleteNotification(id);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error while deleting a notification. [{e.Message}]");
            }
        }


    }
}