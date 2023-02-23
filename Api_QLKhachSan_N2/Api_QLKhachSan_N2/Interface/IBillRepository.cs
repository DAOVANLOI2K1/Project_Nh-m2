using Api_QLKhachSan_N2.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Interface
{
    public interface IBillRepository
    {
        IEnumerable<Bill> getAllBill();
        Bill InsertBill(Bill bill);
        string UpdateBill(string? customerID);
        IEnumerable<CustomerResponse> getBill_Customer([FromQuery] string? customerID);
        double? getBill_Payment([FromQuery] string? customerID);
        IEnumerable<OrderServiceResponse> getBill_OrderService([FromQuery] string? customerID);
        IEnumerable<OrderRoomResponse> getBill_OrderRoom([FromQuery] string? customerID);
        IEnumerable<Bill> getBillByGuestID(string? guestID);
    }
}
