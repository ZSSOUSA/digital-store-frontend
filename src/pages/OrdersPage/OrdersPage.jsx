import Layout from "../Layout/Layout";
import "./ordersPage.css";

export default function OrdersPage() {

  const orders = [
    {
      id: "PED001",
      date: "2024-12-15",
      status: "entregue",
      total: 299.90,
      items: 3,
    },
    {
      id: "PED002",
      date: "2024-12-10",
      status: "entregue",
      total: 149.90,
      items: 1,
    },
    {
      id: "PED003",
      date: "2024-12-05",
      status: "processando",
      total: 519.80,
      items: 2,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "entregue":
        return "success";
      case "processando":
        return "warning";
      case "cancelado":
        return "error";
      default:
        return "dark-gray-3";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "entregue":
        return "Entregue";
      case "processando":
        return "Processando";
      case "cancelado":
        return "Cancelado";
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <Layout>
      <div className="ordersPageContainer">
        <div className="ordersPageContent">
          <h1 className="ordersPageTitle">Meus Pedidos</h1>

          {orders.length > 0 ? (
            <div className="ordersList">
              <div className="ordersHeader">
                <div className="ordersColId">Pedido</div>
                <div className="ordersColDate">Data</div>
                <div className="ordersColItems">Itens</div>
                <div className="ordersColStatus">Status</div>
                <div className="ordersColTotal">Total</div>
              </div>

              {orders.map((order) => (
                <div key={order.id} className="orderItem">
                  <div className="ordersColId">
                    <span className="orderNumber">{order.id}</span>
                  </div>
                  <div className="ordersColDate">
                    {formatDate(order.date)}
                  </div>
                  <div className="ordersColItems">
                    {order.items} {order.items === 1 ? "item" : "itens"}
                  </div>
                  <div className="ordersColStatus">
                    <span className={`statusBadge status--${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="ordersColTotal">
                    R$ {order.total.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="ordersEmpty">
              <p>Você ainda não fez nenhum pedido</p>
              <p>Explore nossos produtos e faça sua primeira compra!</p>
            </div>
          )}

          {/* Seção de informação sobre autenticação */}
          <div className="ordersInfoBox">
            <h3> Informação</h3>
            <p>
              |Pagina de exemplo, faça login para ver seus pedidos. 
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
