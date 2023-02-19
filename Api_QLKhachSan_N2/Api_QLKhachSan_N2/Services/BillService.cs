using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Services
{
    public class BillService : IBillService
    {
        IBillRepository _billRepository;
        public BillService(IBillRepository BillRepository)
        {
            _billRepository = BillRepository;
        }
        public IEnumerable<Bill> getAllBill()
        {
            return _billRepository.getAllBill();
        }

        public Bill InsertBill(Bill bill)
        {
            return _billRepository.InsertBill(bill);
        }
    }
}
