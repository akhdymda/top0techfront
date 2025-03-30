import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">CHOTTO</h1>
        <p className="text-sm text-gray-600">スキルマッチングサービス</p>
      </div>

      <div className="w-full max-w-md px-6">
        <a href="/signup" className="block w-full text-center mb-8">
          <button className="w-full py-2 px-4 bg-white text-black border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            新規登録
          </button>
        </a>

        <div className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <div className="text-right mt-1">
              <a href="/forgot" className="text-xs text-gray-500 hover:underline">
                Forgot ?
              </a>
            </div>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <div className="text-right mt-1">
              <a href="/forgot" className="text-xs text-gray-500 hover:underline">
                Forgot ?
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm text-gray-600">
              ログインしたままにする
            </label>
          </div>

          <button className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors">
            Login
          </button>

          <div className="text-center mt-4">
            <a href="/google" className="text-sm text-gray-600 hover:underline">
              Login with Google »
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
