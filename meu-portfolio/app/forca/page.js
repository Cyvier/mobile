'use client';
import { useState, useEffect, useRef } from 'react';

const palavras = [
  'javascript',
  'react',
  'nextjs',
  'programacao',
  'computador',
  'internet',
  'algoritmo',
  'desenvolvedor',
  'frontend',
  'backend'
];

const alfabeto = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function Forca() {
  const canvasRef = useRef(null);

  const [palavra, setPalavra] = useState(
    palavras[Math.floor(Math.random() * palavras.length)]
  );
  const [letras, setLetras] = useState([]);
  const [erros, setErros] = useState(0);

  const maxErros = 6;

  // 🎬 Efeito Matrix
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#22c55e';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  function tentar(letra) {
    if (letras.includes(letra)) return;

    setLetras(prev => [...prev, letra]);

    if (!palavra.includes(letra)) {
      setErros(prev => prev + 1);
    }
  }

  function reiniciar() {
    setPalavra(palavras[Math.floor(Math.random() * palavras.length)]);
    setLetras([]);
    setErros(0);
  }

  const palavraOculta = palavra
    .split('')
    .map(l => (letras.includes(l) ? l : '_'))
    .join(' ');

  const venceu = palavra
    .split('')
    .every(l => letras.includes(l));

  const perdeu = erros >= maxErros;

  const estagios = [
    `
     _______
     |     |
     |
     |
     |
    _|_
    `,
    `
     _______
     |     |
     |     O
     |
     |
    _|_
    `,
    `
     _______
     |     |
     |     O
     |     |
     |
    _|_
    `,
    `
     _______
     |     |
     |     O
     |    /|
     |
    _|_
    `,
    `
     _______
     |     |
     |     O
     |    /|\\
     |
    _|_
    `,
    `
     _______
     |     |
     |     O
     |    /|\\
     |    /
    _|_
    `,
    `
     _______
     |     |
     |     O
     |    /|\\
     |    / \\
    _|_
    `
  ];

  return (
    <div className="relative min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 overflow-hidden">

      {/* Fundo Matrix */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-20"
      />

      <h1 className="text-4xl text-cyan-400 mb-4 z-10">
        🎮 Jogo da Forca
      </h1>

      <pre className="text-sm mb-6 text-gray-300 z-10">
        {estagios[erros]}
      </pre>

      <p className="text-3xl tracking-widest mb-6 z-10">
        {palavraOculta}
      </p>

      {!venceu && !perdeu && (
        <div className="grid grid-cols-7 gap-2 mb-6 z-10">
          {alfabeto.map(letra => (
            <button
              key={letra}
              onClick={() => tentar(letra)}
              disabled={letras.includes(letra)}
              className={`p-2 rounded 
                ${letras.includes(letra)
                  ? 'bg-gray-600'
                  : 'bg-cyan-400 text-black hover:bg-cyan-300'}
              `}
            >
              {letra}
            </button>
          ))}
        </div>
      )}

      {venceu && (
        <p className="text-green-400 text-xl mb-4 z-10">
          🎉 Você venceu!
        </p>
      )}

      {perdeu && (
        <p className="text-red-400 text-xl mb-4 z-10">
          💀 Você perdeu! Palavra: {palavra}
        </p>
      )}

      <button
        onClick={reiniciar}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-400 z-10"
      >
        Reiniciar
      </button>

    </div>
  );
}