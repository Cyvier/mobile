import Link from 'next/link';
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-6">

      <div className="text-center">
        <h1 className="text-5xl font-bold text-cyan-400 mb-4">
          Davi Magalhães Mendes
        </h1>

        <p className="text-gray-300 text-lg">
          Desenvolvedor em formação
        </p>
      </div>

      <div className="mt-10 max-w-xl text-center">
        <h2 className="text-2xl font-semibold mb-2">Sobre mim</h2>
        <p className="text-gray-400">
          Estudante de tecnologia focado em desenvolvimento de software,
          algoritmos e tentando se aperfeiçoar
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Projetos
        </h2>

        <Link href="/forca">
          <div className="bg-slate-700 hover:bg-slate-600 transition p-6 rounded-2xl shadow-lg cursor-pointer">
            🎮 Jogo da Forca
          </div>
        </Link>
      </div>

    </main>
  );
}