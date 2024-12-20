'use client'

import { useEffect, useState } from "react"

const motivationalMessages = [
  "Tu cuerpo es tu mejor herramienta. Cuídalo y dale el tiempo que necesita para recuperarse.",
  "El progreso no es lineal, pero cada paso cuenta en tu recuperación.",
  "Escucha a tu cuerpo, no a tu ego. La paciencia es parte del proceso.",
  "No te apresures. Una sesión bien hecha vale más que dos a medias.",
  "El descanso es tan importante como el esfuerzo. Dale prioridad.",
  "Un día a la vez, una sesión a la vez: así se construye tu éxito.",
  "Hacer más no siempre es mejor. Sé constante, no impulsivo.",
  "Tu salud es tu mayor riqueza. Invierte en ella con inteligencia.",
  "La clave del éxito es la consistencia, no la velocidad.",
  "Cada ejercicio es un paso hacia una versión más fuerte y saludable de ti.",
  "Pequeños progresos diarios crean grandes cambios a largo plazo.",
  "La disciplina supera a la motivación. Mantente enfocado en tu meta.",
  "El movimiento es medicina. Hazlo con propósito y moderación.",
  "La recuperación es un maratón, no un sprint. Disfruta el proceso.",
  "Un cuerpo fuerte comienza con una mente enfocada en la recuperación.",
  "Una sesión al día es suficiente para alcanzar tus metas. Confía en el proceso.",
  "Tu constancia en los días difíciles es lo que marcará la diferencia.",
  "El equilibrio entre esfuerzo y descanso es la clave del éxito.",
  "Recuerda: menos es más cuando se trata de una rehabilitación efectiva.",
  "Cada repetición cuenta. Hazlas con intención y sin prisa.",
  "La verdadera fortaleza está en saber cuándo detenerte para recuperarte.",
  "Cuidar de ti mismo hoy asegura un mejor mañana.",
  "Incluso las pausas son parte de un gran entrenamiento.",
  "Escucha tu cuerpo: la recuperación también es un logro.",
  "Esfuérzate, pero nunca a costa de tu salud.",
  "La paciencia hoy evitará contratiempos mañana.",
  "Cada sesión que completas es una victoria. Celebra tus logros.",
  "La calidad siempre supera a la cantidad en el entrenamiento.",
  "No subestimes el poder de una buena sesión. Una al día es suficiente.",
  "Tu cuerpo te agradecerá por respetar su tiempo y límites.",
  "La constancia vence al tiempo. Sigue adelante.",
  "Todo esfuerzo consciente suma en tu recuperación.",
  "La clave está en avanzar, no en apresurarte.",
  "Confía en el proceso y celebra cada pequeño logro.",
  "Tu mayor aliado en este camino es la paciencia.",
  "Un paso atrás no significa fracaso. Es parte del camino hacia adelante.",
  "Fortalece tu cuerpo con cada sesión, pero no olvides fortalecer tu mente también.",
  "El descanso adecuado es una herramienta poderosa para la recuperación.",
  "Aprecia el viaje, no solo el destino.",
  "Hoy es otro día para avanzar hacia tu mejor versión.",
];

export default function MotivationalMessage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const randomMessage = 
      motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
    setMessage(randomMessage)
  }, [])

  return <p className="text-sm text-blue-700 text-center w-full">{message}</p>
}