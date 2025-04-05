export const dynamic = 'force-dynamic'
import UserCard from "../../../../components/UserCard";

async function fetchCustomer(id) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

export default async function ReadPage({ params }) {
  const { id } = params;
  const customerInfo = await fetchCustomer(id);
  
  // 顧客データをUserCardコンポーネントが期待する形式に変換
  const userData = {
    ...customerInfo[0],
    name: customerInfo[0].name || "名前なし",
    image: customerInfo[0].image || "/default-avatar.png",
    department: customerInfo[0].company || "",
    yearsOfService: customerInfo[0].birthday || "",
    specialty: customerInfo[0].email || "",
    skills: customerInfo[0].skills || []
  };

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <UserCard user={userData} />
      </div>
      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
  );
} 