using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Repositories
{
    public class OrderRoomRepository : IOrderRoomRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public OrderRoomRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public IEnumerable<OrderRoom> GetAllOrderRooms(int? PageIndex, int? RowPerPage, string Search)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("LOIDV")))
            {
                //chuẩn bị câu truy vấn
                var getProcedure = "Proc_OrderRooms_GetAll";

                //chuẩn bị parameters
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PageIndex", PageIndex);
                parameters.Add("@RowPerPage", RowPerPage);
                parameters.Add("@Search", Search);

                //truy vấn
                var result = SqlServerConnection.QueryMultiple(getProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<OrderRoom>();
                }
                return null;
            }
        }

        public string InsertOrderRoom(OrderRoom OrderRoom)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("LOIDV")))
            {
                // Chuẩn bị proc
                var insertProcedure = "Proc_OrderRooms_Insert";

                // Chuẩn bị tham số cho proc
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PID", OrderRoom.PID);
                parameters.Add("@KHID", OrderRoom.KHID);
                parameters.Add("@NgayBatDau", OrderRoom.NgayBatDau);
                parameters.Add("@NgayKetThuc", OrderRoom.NgayKetThuc);
                parameters.Add("@GiaTien", OrderRoom.GiaTien);
                parameters.Add("@isDelete", OrderRoom.isDelete);

                // Thực thi proc
                var result = SqlServerConnection.Execute(insertProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result > 0)
                {
                    return "Đặt phòng thành công";
                }
                return null;
            }
        }

        public OrderRoom UpdateOrderRoom(OrderRoom OrderRoom)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("LOIDV")))
            {
                // Chuẩn bị proc
                var updateProcedure = "Proc_OrderRooms_Update";

                // Chuẩn bị tham số cho proc
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@IDDP", OrderRoom.IDDP);
                parameters.Add("@GiaTien", OrderRoom.GiaTien);
                parameters.Add("@NgayBatDau", OrderRoom.NgayBatDau);
                parameters.Add("@NgayKetThuc", OrderRoom.NgayKetThuc);
                parameters.Add("@isDelete", OrderRoom.isDelete);

                // Thực thi proc
                var result = SqlServerConnection.Query(updateProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return OrderRoom;
                }
                return null;
            }
        }
    }
}
