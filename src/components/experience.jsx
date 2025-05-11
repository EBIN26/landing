// File: webb/landing/src/components/experience.jsx

import { Float, PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Euler, Group, Vector3 } from "three"; // Euler, Group, Vector3 might not be explicitly used but THREE.* covers them
import { usePlay } from "../contexts/Play";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
import { Airplane } from "./Airplane";
import { Background } from "./Background";
import { Cloud } from "./Cloud";
import { TextSection } from "./TextSection";

const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;
const FRICTION_DISTANCE = 42;

export const Experience = () => {
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
    ],
    []
  );

  const sceneOpacity = useRef(0);
  const lineMaterialRef = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  }, []);

  const textSections = useMemo(() => {
    return [
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[1].x - 4,
          curvePoints[1].y,
          curvePoints[1].z
        ),
        title: "Welcome to MARINA DIGI",
        subtitle: `We’re the brains behind the buzz.
Turning brands into trends, and scrolls into sales — one fire strategy at a time.
From content that slaps to campaigns that convert, we’ve got the digital game on lock.
Your brand’s next big glow-up? Starts right here.`,
        titleFontSize: 0.45,
        titleMaxWidth: 3,
        titleLineHeight: 1,
        subtitleFontSize: 0.22,
        subtitleMaxWidth: 4,
        subtitleLineHeight: 1.2,
        textColor:"white"
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[2].x + 1,
          curvePoints[2].y,
          curvePoints[2].z
        ),
        title: "What we are about",
        subtitle: `At Marina Digitals, we don’t just manage socials — we own them.
Instagram, TikTok, YouTube, LinkedIn, X — wherever your audience hangs out, we make your brand unmissable.
From trending reels to viral campaigns, sharp captions to paid ads that actually hit — we handle the strategy, the vibes, and the results.
We help you grow followers, boost engagement, and turn views into value.
Basically? We make your brand that brand online. 💅📈
Let’s make your socials pop off. 🔥
`,
        titleFontSize: 0.481,
        titleMaxWidth: 4.0,
        titleLineHeight: 1,
        subtitleFontSize: 0.22,
        subtitleMaxWidth: 5.0,
        subtitleLineHeight: 1.1,
        textColor:"white"
      },
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[3].x - 4,
          curvePoints[3].y,
          curvePoints[3].z
        ),
        title: "About Our Team",
        subtitle: `We’re a tight-knit crew of content creators, editors, and digital strategists spread across time zones but synced on vibes. 🌍💻
From viral edits to scroll-stopping posts, we do it all — and we do it remotely, powered by coffee, Wi-Fi, and a shared group chat that never sleeps.
We stay on-trend, think ahead, and always bring the main character energy to every project. ✨🎬🧠
`,
        titleFontSize: 0.52,
        titleMaxWidth: 4.0,
        titleLineHeight: 1,
        subtitleFontSize: 0.2,
        subtitleMaxWidth: 4,
        subtitleLineHeight: 1.2,
        textColor:"white"
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[4].x + 2.5,
          curvePoints[4].y,
          curvePoints[4].z - 12
        ),
        title: "Our Success Rate? Off the Charts.",
        subtitle: `We don’t just talk the talk — we walk the digital walk.
Our clients see real growth: more clicks, more followers, and more sales. 🚀🔥
With smart strategy, creative content, and a little bit of digital magic, we turn numbers into wins.
It’s not just marketing; it’s results. And we’ve got the stats to prove it. `,
        titleFontSize: 0.50,
        titleMaxWidth: 4.5,
        titleLineHeight: 0.9,
        subtitleFontSize: 0.19,
        subtitleMaxWidth: 4.0,
        subtitleLineHeight: 1.3,
        textColor:"white"
      },
    ];
  }, []);

  const clouds = useMemo(
    () => [
      { position: new Vector3(-3.5, -3.2, -7) },
      { position: new Vector3(3.5, -4, -10) },
      { scale: new Vector3(4, 4, 4), position: new Vector3(-18, 0.2, -68), rotation: new THREE.Euler(-Math.PI / 5, Math.PI / 6, 0) },
      { scale: new Vector3(2.5, 2.5, 2.5), position: new Vector3(10, -1.2, -52) },
      { scale: new Vector3(4, 4, 4), position: new Vector3(curvePoints[1].x + 10, curvePoints[1].y - 4, curvePoints[1].z + 64) },
      { scale: new Vector3(3, 3, 3), position: new Vector3(curvePoints[1].x - 20, curvePoints[1].y + 4, curvePoints[1].z + 28), rotation: new THREE.Euler(0, Math.PI / 7, 0) },
      { rotation: new THREE.Euler(0, Math.PI / 7, Math.PI / 5), scale: new Vector3(5, 5, 5), position: new Vector3(curvePoints[1].x - 13, curvePoints[1].y + 4, curvePoints[1].z - 62) },
      { rotation: new THREE.Euler(Math.PI / 2, Math.PI / 2, Math.PI / 3), scale: new Vector3(5, 5, 5), position: new Vector3(curvePoints[1].x + 54, curvePoints[1].y + 2, curvePoints[1].z - 82) },
      { scale: new Vector3(5, 5, 5), position: new Vector3(curvePoints[1].x + 8, curvePoints[1].y - 14, curvePoints[1].z - 22) },
      { scale: new Vector3(3, 3, 3), position: new Vector3(curvePoints[2].x + 6, curvePoints[2].y - 7, curvePoints[2].z + 50) },
      { scale: new Vector3(2, 2, 2), position: new Vector3(curvePoints[2].x - 2, curvePoints[2].y + 4, curvePoints[2].z - 26) },
      { scale: new Vector3(4, 4, 4), position: new Vector3(curvePoints[2].x + 12, curvePoints[2].y + 1, curvePoints[2].z - 86), rotation: new THREE.Euler(Math.PI / 4, 0, Math.PI / 3) },
      { scale: new Vector3(3, 3, 3), position: new Vector3(curvePoints[3].x + 3, curvePoints[3].y - 10, curvePoints[3].z + 50) },
      { scale: new Vector3(3, 3, 3), position: new Vector3(curvePoints[3].x - 10, curvePoints[3].y, curvePoints[3].z + 30), rotation: new THREE.Euler(Math.PI / 4, 0, Math.PI / 5) },
      { scale: new Vector3(4, 4, 4), position: new Vector3(curvePoints[3].x - 20, curvePoints[3].y - 5, curvePoints[3].z - 8), rotation: new THREE.Euler(Math.PI, 0, Math.PI / 5) },
      { scale: new Vector3(5, 5, 5), position: new Vector3(curvePoints[3].x + 0, curvePoints[3].y - 5, curvePoints[3].z - 98), rotation: new THREE.Euler(0, Math.PI / 3, 0) },
      { scale: new Vector3(2, 2, 2), position: new Vector3(curvePoints[4].x + 3, curvePoints[4].y - 10, curvePoints[4].z + 2) },
      { scale: new Vector3(3, 3, 3), position: new Vector3(curvePoints[4].x + 24, curvePoints[4].y - 6, curvePoints[4].z - 42), rotation: new THREE.Euler(Math.PI / 4, 0, Math.PI / 5) },
      { scale: new Vector3(3, 3, 3), position: new Vector3(curvePoints[4].x - 4, curvePoints[4].y + 9, curvePoints[4].z - 62), rotation: new THREE.Euler(Math.PI / 3, 0, Math.PI / 3) },
      { scale: new Vector3(3, 3, 3), position: new Vector3(curvePoints[7].x + 12, curvePoints[7].y - 5, curvePoints[7].z + 60), rotation: new THREE.Euler(-Math.PI / 4, -Math.PI / 6, 0) },
      { scale: new Vector3(3, 3, 3), position: new Vector3(curvePoints[7].x - 12, curvePoints[7].y + 5, curvePoints[7].z + 120), rotation: new THREE.Euler(Math.PI / 4, Math.PI / 6, 0) },
    ],
    []
  );

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);
    return shape;
  }, []); // curve dependency removed as it's stable due to curvePoints stability

  const cameraGroup = useRef();
  const cameraRail = useRef();
  const camera = useRef();
  const scroll = useScroll();
  const lastScroll = useRef(0);

  const { play, setHasScroll, end, setEnd } = usePlay();

  // --- THIS IS THE CORRECTED PART ---
  const backgroundColors = useRef({
    colorA: "#1C2541",
    colorB: "#F0F8FF", // Corrected: No leading spaces
  });
  // --- END OF CORRECTION ---

  const tl = useRef();
  const planeInTl = useRef();
  const planeOutTl = useRef();

  useFrame((_state, delta) => {
    if (window.innerWidth > window.innerHeight) {
      camera.current.fov = 30;
      camera.current.position.z = 5;
    } else {
      camera.current.fov = 80;
      camera.current.position.z = 2;
    }

    if (lastScroll.current <= 0 && scroll.offset > 0) {
      setHasScroll(true);
    }

    if (play && !end && sceneOpacity.current < 1) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        1,
        delta * 0.1
      );
    }

    if (end && sceneOpacity.current > 0) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        0,
        delta
      );
    }

    if (lineMaterialRef.current) { // Ensure ref is populated
        lineMaterialRef.current.opacity = sceneOpacity.current;
    }


    if (end) {
      return;
    }

    const scrollOffset = Math.max(0, scroll.offset);

    let friction = 1;
    let resetCameraRail = true;
    textSections.forEach((textSection) => {
      const distance = textSection.position.distanceTo(
        cameraGroup.current.position
      );

      if (distance < FRICTION_DISTANCE) {
        friction = Math.max(distance / FRICTION_DISTANCE, 0.1);
        const targetCameraRailPosition = new Vector3(
          (1 - distance / FRICTION_DISTANCE) * textSection.cameraRailDist,
          0,
          0
        );
        cameraRail.current.position.lerp(targetCameraRailPosition, delta);
        resetCameraRail = false;
      }
    });

    if (resetCameraRail) {
      const targetCameraRailPosition = new Vector3(0, 0, 0);
      cameraRail.current.position.lerp(targetCameraRailPosition, delta);
    }

    let lerpedScrollOffset = THREE.MathUtils.lerp(
      lastScroll.current,
      scrollOffset,
      delta * friction
    );
    lerpedScrollOffset = Math.min(lerpedScrollOffset, 1);
    lerpedScrollOffset = Math.max(lerpedScrollOffset, 0);

    lastScroll.current = lerpedScrollOffset;
    if (tl.current) { // Ensure tl.current is initialized
        tl.current.seek(lerpedScrollOffset * tl.current.duration());
    }


    const curPoint = curve.getPoint(lerpedScrollOffset);
    cameraGroup.current.position.lerp(curPoint, delta * 24);

    const lookAtPoint = curve.getPoint(
      Math.min(lerpedScrollOffset + CURVE_AHEAD_CAMERA, 1)
    );

    const currentLookAt = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    );
    const targetLookAt = new THREE.Vector3()
      .subVectors(curPoint, lookAtPoint)
      .normalize();

    const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    );

    if (airplane.current) { // Ensure airplane ref is populated
        const tangent = curve.getTangent(lerpedScrollOffset + CURVE_AHEAD_AIRPLANE);
        const nonLerpLookAt = new Group();
        nonLerpLookAt.position.copy(curPoint);
        nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt));

        tangent.applyAxisAngle(
        new THREE.Vector3(0, 1, 0),
        -nonLerpLookAt.rotation.y
        );

        let angle = Math.atan2(-tangent.z, tangent.x);
        angle = -Math.PI / 2 + angle;
        let angleDegrees = (angle * 180) / Math.PI;
        angleDegrees *= 2.4;

        if (angleDegrees < 0) {
        angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE);
        }
        if (angleDegrees > 0) {
        angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE);
        }
        angle = (angleDegrees * Math.PI) / 180;

        const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
            airplane.current.rotation.x,
            airplane.current.rotation.y,
            angle
        )
        );
        airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
    }


    if (
      cameraGroup.current.position.z <
      curvePoints[curvePoints.length - 1].z + 100
    ) {
      setEnd(true);
      if (planeOutTl.current && planeOutTl.current.paused()) { // Ensure timeline exists and isn't already playing
        planeOutTl.current.play();
      }
    }
  });

  const airplane = useRef();

  useLayoutEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(backgroundColors.current, { duration: 1, colorA: "#6f35cc", colorB: "#ffad30" });
    tl.current.to(backgroundColors.current, { duration: 1, colorA: "#424242", colorB: "#ffcc00" });
    tl.current.to(backgroundColors.current, { duration: 1, colorA: "#81318b", colorB: "#55ab8f" });
    tl.current.pause();

    planeInTl.current = gsap.timeline();
    planeInTl.current.pause();
    if (airplane.current) { // Check if airplane.current is defined
        planeInTl.current.from(airplane.current.position, { duration: 3, z: 5, y: -2 });
    }


    planeOutTl.current = gsap.timeline();
    planeOutTl.current.pause();
    if (airplane.current && cameraRail.current) { // Check if refs are defined
        planeOutTl.current.to(airplane.current.position, { duration: 10, z: -250, y: 10 }, 0);
        planeOutTl.current.to(cameraRail.current.position, { duration: 8, y: 12 }, 0);
        planeOutTl.current.to(airplane.current.position, { duration: 1, z: -1000 });
    }

  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    if (play && planeInTl.current && planeInTl.current.paused()) { // Ensure timeline exists and isn't already playing
      planeInTl.current.play();
    }
  }, [play]);

  return useMemo(
    () => (
      <>
        <directionalLight position={[0, 3, 1]} intensity={0.1} />
        <group ref={cameraGroup}>
          <Background backgroundColors={backgroundColors} />
          <group ref={cameraRail}>
            <PerspectiveCamera
              ref={camera}
              position={[0, 0, 5]}
              fov={30}
              makeDefault
            />
          </group>
          <group ref={airplane}>
            <Float floatIntensity={1} speed={1.5} rotationIntensity={0.5}>
              <Airplane
                rotation-y={Math.PI / 2}
                scale={[0.2, 0.2, 0.2]}
                position-y={0.1}
              />
            </Float>
          </group>
        </group>
        {textSections.map((textSection, index) => (
          <TextSection {...textSection} key={index} />
        ))}
        <group position-y={-2}>
          <mesh>
            <extrudeGeometry
              args={[
                shape,
                {
                  steps: LINE_NB_POINTS,
                  bevelEnabled: false,
                  extrudePath: curve,
                },
              ]}
            />
            <meshStandardMaterial
              color={"white"}
              ref={lineMaterialRef}
              transparent
              envMapIntensity={2}
              onBeforeCompile={fadeOnBeforeCompile}
            />
          </mesh>
        </group>
        {clouds.map((cloud, index) => (
          <Cloud sceneOpacity={sceneOpacity} {...cloud} key={index} />
        ))}
      </>
    ),
    // textSections, clouds, shape, curve, fadeOnBeforeCompile are stable if their inputs are.
    // backgroundColors is a ref, so it's stable.
    // sceneOpacity is a ref.
    [] // Keeping dependencies minimal if sub-components don't change and refs are stable
  );
};