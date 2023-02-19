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
using System.Linq;
using System.Threading.Tasks;

namespace Api_QLKhachSan_N2.Controllers
{
    [Route("/api/v1/OrderServices")]
    [ApiController]
    public class OrderServicesController : ControllerBase
    {
        public IOrderServiceService _orderServiceService;
        public OrderServicesController(IOrderServiceService orderServiceService)
        {
            _orderServiceService = orderServiceService;
        }

        [HttpPost]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status201Created, type: typeof(OrderService))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult InsertOrderService([FromBody] OrderService orderService)
        {
            try
            {
                var result = _orderServiceService.InsertOrderService(orderService);

                // Xử lý trả về của DB
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status201Created, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "Lỗi db!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
