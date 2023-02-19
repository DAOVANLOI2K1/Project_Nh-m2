using Api_QLKhachSan_N2.Entities;
using Api_QLKhachSan_N2.Interface;

namespace Api_QLKhachSan_N2.Services
{
    public class OrderServiceService : IOrderServiceService
    {
        public readonly IOrderServiceRepository _orderServiceRepository;
        public OrderServiceService(IOrderServiceRepository orderServiceRepository)
        {
            _orderServiceRepository = orderServiceRepository;
        }
        public OrderService InsertOrderService(OrderService orderService)
        {
            return _orderServiceRepository.InsertOrderService(orderService);
        }
    }
}
