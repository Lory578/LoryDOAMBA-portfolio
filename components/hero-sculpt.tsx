"use client"

import { useEffect, useRef } from "react"

export function HeroSculpt() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let disposed = false
    let frame = 0
    let cleanup: (() => void) | undefined

    ;(async () => {
      const THREE = await import("three")
      if (disposed || !canvas) return

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50)
      camera.position.set(0, 0, 6.5)

      scene.add(new THREE.AmbientLight(0xfaf4ec, 0.7))
      const key = new THREE.DirectionalLight(0xffffff, 1.1)
      key.position.set(2, 3, 4)
      scene.add(key)
      const rim = new THREE.DirectionalLight(0xc9166a, 0.9)
      rim.position.set(-3, -1, 2)
      scene.add(rim)

      const ribbonMat = new THREE.MeshStandardMaterial({
        color: 0xc9166a,
        metalness: 0.35,
        roughness: 0.3,
        transparent: true,
        opacity: 0.78,
        side: THREE.DoubleSide,
      })
      const clayMat = new THREE.MeshStandardMaterial({
        color: 0xb84b32,
        metalness: 0.15,
        roughness: 0.45,
        transparent: true,
        opacity: 0.72,
      })
      const creamMat = new THREE.MeshStandardMaterial({
        color: 0xf0e0d0,
        metalness: 0.05,
        roughness: 0.6,
        transparent: true,
        opacity: 0.55,
      })
      const terreMat = new THREE.MeshStandardMaterial({
        color: 0x5a4338,
        metalness: 0.2,
        roughness: 0.4,
        transparent: true,
        opacity: 0.8,
      })

      const ribbon = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.18, 24, 100), ribbonMat)
      ribbon.position.set(1.7, 0.25, -0.4)
      ribbon.rotation.x = 0.7
      scene.add(ribbon)

      const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.42, 0.12, 100, 16), terreMat)
      knot.position.set(2.6, 0.95, -0.2)
      scene.add(knot)

      const petal = new THREE.Mesh(
        new THREE.SphereGeometry(0.85, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.65),
        clayMat,
      )
      petal.position.set(2.3, -0.55, 0.25)
      petal.scale.set(1.25, 0.55, 1)
      scene.add(petal)

      const disk = new THREE.Mesh(new THREE.CircleGeometry(1.05, 64), creamMat)
      disk.position.set(1.1, 1.05, -1.15)
      scene.add(disk)

      const sparkCount = 50
      const sparkGeo = new THREE.BufferGeometry()
      const sparkPos = new Float32Array(sparkCount * 3)
      for (let i = 0; i < sparkCount; i++) {
        sparkPos[i * 3] = (Math.random() - 0.15) * 5
        sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 4
        sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 2
      }
      sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3))
      const sparks = new THREE.Points(
        sparkGeo,
        new THREE.PointsMaterial({ color: 0xe83a86, size: 0.035, transparent: true, opacity: 0.85 }),
      )
      scene.add(sparks)

      let mx = 0
      let my = 0
      const onMove = (e: PointerEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 0.55
        my = (e.clientY / window.innerHeight - 0.5) * 0.3
      }
      window.addEventListener("pointermove", onMove)

      const resize = () => {
        const parent = canvas.parentElement
        if (!parent) return
        const w = parent.clientWidth
        const h = parent.clientHeight
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        const mobile = w < 900
        ribbon.position.x = mobile ? 0.35 : 1.7
        petal.position.x = mobile ? 0.85 : 2.3
        knot.position.x = mobile ? 1.1 : 2.6
        disk.position.x = mobile ? 0.15 : 1.1
      }
      resize()
      window.addEventListener("resize", resize)

      let t = 0
      const tick = () => {
        if (disposed) return
        t += reduce ? 0 : 0.008
        ribbon.rotation.z = t * 0.35
        ribbon.rotation.x = 0.7 + Math.sin(t * 0.7) * 0.12
        knot.rotation.x = t * 0.5
        knot.rotation.y = t * 0.35
        petal.rotation.z = Math.sin(t * 0.5) * 0.18
        petal.position.y = -0.55 + Math.sin(t) * 0.1
        disk.rotation.z = -t * 0.2
        sparks.rotation.y = t * 0.08
        camera.position.x += (mx - camera.position.x) * 0.05
        camera.position.y += (-my - camera.position.y) * 0.05
        camera.lookAt(0.8, 0, 0)
        renderer.render(scene, camera)
        frame = requestAnimationFrame(tick)
      }
      tick()

      cleanup = () => {
        cancelAnimationFrame(frame)
        window.removeEventListener("pointermove", onMove)
        window.removeEventListener("resize", resize)
        renderer.dispose()
        sparkGeo.dispose()
        ribbon.geometry.dispose()
        knot.geometry.dispose()
        petal.geometry.dispose()
        disk.geometry.dispose()
        ribbonMat.dispose()
        clayMat.dispose()
        creamMat.dispose()
        terreMat.dispose()
      }
    })()

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
