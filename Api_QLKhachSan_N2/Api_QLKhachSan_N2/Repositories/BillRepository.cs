using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Repositories
{
    public class BillRepository : IBillRepository
    {
        IConfiguration configuration;
        SqlConnection SqlServerConnection;
        public BillRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public IEnumerable<Bill> getAllBill()
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("LOIDV")))
            {
                // Chuẩn bị proc
                var getProcedure = "Proc_Bill_Get";

                // Thực thi proc
                var result = SqlServerConnection.QueryMultiple(getProcedure, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return result.Read<Bill>();
                }
                return null;
            }
        }

        public Bill InsertBill(Bill bill)
        {
            // Kết nối DB
            using (SqlServerConnection = new SqlConnection(configuration.GetConnectionString("LOIDV")))
            {
                // Chuẩn bị proc
                var insertProcedure = "Proc_Bill_Insert";

                // Chuẩn bị tham số cho proc
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@IDDP", bill.IDDP);
                parameters.Add("@IDGoiDV", bill.IDGoiDV);
                parameters.Add("@TongTien", bill.TongTien);
                parameters.Add("@GhiChu", bill.GhiChu);
                parameters.Add("@KHID", bill.KHID);

                // Thực thi proc
                var result = SqlServerConnection.Query(insertProcedure, parameters, commandType: System.Data.CommandType.StoredProcedure);
                if (result != null)
                {
                    return bill;
                }
                return null;
            }
        }
    }
}
