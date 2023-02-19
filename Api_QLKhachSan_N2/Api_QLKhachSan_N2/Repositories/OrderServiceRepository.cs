using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Repositories
{
    public class OrderServiceRepository : IOrderServiceRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public OrderServiceRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public OrderService InsertOrderService(OrderService orderService)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("LOIDV")))
            {
                // Chuẩn bị proc
                var insertProcedure = "Proc_OrderService_Insert";

                // Chuẩn bị tham số cho proc
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DVID", orderService.DVID);
                parameters.Add("@KHID", orderService.KHID);
                parameters.Add("@ThoiGianGoi", orderService.ThoiGianGoi);
                parameters.Add("@GiaTien", orderService.GiaTien);

                // Thực thi proc
                var result = SqlServerConnection.Query(insertProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return orderService;
                }
                return null;
            }
        }
    }
}
