﻿using Api_QLKhachSan_N2.Entities;
using System.Collections.Generic;

namespace Api_QLKhachSan_N2.Interface
{
    public interface IOrderServiceRepository
    {
        OrderService InsertOrderService(OrderService orderService);
    }
}
