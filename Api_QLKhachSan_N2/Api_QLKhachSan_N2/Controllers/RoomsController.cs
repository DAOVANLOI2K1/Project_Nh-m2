using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Controllers
{
    [Route("api/v1/Rooms")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        public IRoomService _roomService;
        public RoomsController(IRoomService roomService) 
        {
            _roomService = roomService; 
        }
        /// <summary>
        /// api phân trang phòng
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="RowPerPage"></param>
        /// <param name="Sort"></param>
        /// <param name="Search"></param>
        /// <returns></returns>
        [HttpGet]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<Room>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAll_Rooms([FromQuery] int? PageIndex, [FromQuery] int? RowPerPage/*, [FromQuery] string? Sort*/, [FromQuery] string? Search)
        {
            try
            {
                var result = _roomService.GetAllRoom(PageIndex, RowPerPage, Search);

                //trả về dữ liệu
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        /// <summary>
        /// api sửa thông tin phòng: giá, isDelete, mô tả
        /// </summary>
        /// <param name="room"></param>
        /// <returns></returns>
        [HttpPut]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK,type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult Update_Room([FromBody]Room room)
        {
            try
            {
                
                var result = _roomService.UpdateRoom(room);
                
                //trả về dữ liệu
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "Lỗi db");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Lỗi db");
            }
        }
        /// <summary>
        /// api cập nhật lại trạng thái của phòng
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        [Route("Status")]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK)]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult Update_Room_Status()
        {
            try
            {
                var result = _roomService.UpdateRoomStatus();

                // Xử lý trả về của DB
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Lỗi server");
            }
        }
    }
}
