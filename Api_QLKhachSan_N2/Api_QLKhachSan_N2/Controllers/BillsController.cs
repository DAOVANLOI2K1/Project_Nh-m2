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
    [Route("/api/v1/Bills")]
    [ApiController]
    public class BillsController : ControllerBase
    {
        public BillsController(IBillService billService)
        {
            _billService = billService;
        }
        public IBillService _billService;

        [HttpGet]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(List<Bill>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult getAllBill()
        {
            try
            {
                var result = _billService.getAllBill();

                // Xử lý trả về của DB
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status200OK, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "Lỗi db!");
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status201Created, type: typeof(Bill))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult InsertBill([FromBody] Bill bill)
        {
            try
            {
                var result = _billService.InsertBill(bill);

                // Xử lý trả về của DB
                if (result != null)
                {
                    return StatusCode(StatusCodes.Status201Created, result);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "Lỗi db!");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
