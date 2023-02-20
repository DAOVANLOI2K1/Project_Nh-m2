using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_QLKhachSan_N2.Entities
{
    public class Bill
    {
        /// <summary>
        /// ID đặt phòng
        /// </summary>
        public Guid? IDDP { get; set; }

        /// <summary>
        /// ID gọi dịch vụ
        /// </summary>
        public Guid? IDGoiDV { get; set; }

        /// <summary>
        /// Tổng tiền phải thanh toán
        /// </summary>
        public double? TongTien { get; set; }

        /// <summary>
        /// Ghi chú hóa đơn
        /// </summary>
        public string? GhiChu { get; set; }

        /// <summary>
        /// ID khách hàng
        /// </summary>
        public Guid? KHID { get; set; }
        public object SoCMTKhachHang { get; set; }
        public object MaHD { get; set; }
        public object TrangThai { get; set; }
    }
}
