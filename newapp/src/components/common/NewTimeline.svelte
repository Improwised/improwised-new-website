<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { MotionPathPlugin } from "gsap/MotionPathPlugin";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import * as Card from "$lib/components/ui/card";
  import phase1 from "$lib/images/timeline-phase/phase-1.svg"
  import phase2 from "$lib/images/timeline-phase/phase-2.svg"
  import phase3 from "$lib/images/timeline-phase/phase-3.svg"
  import phase4 from "$lib/images/timeline-phase/phase-4.svg"
  import phase5 from "$lib/images/timeline-phase/phase-5.svg"

  export let phases;  

  let svg;
  let path;
  let windowWidth;
  let scrollTriggerId = null;
  let isInitialized = false;

  $: IS_MOBILE = windowWidth < 768;
  const VIEWBOX_WIDTH = 900;
  $: START_Y = IS_MOBILE ? 350 : 350;
  $: CENTER_X = IS_MOBILE ? windowWidth / 2 : VIEWBOX_WIDTH / 2;

  $: CARD_WIDTH = IS_MOBILE ? (windowWidth < 576 ? windowWidth - 32 : windowWidth - 48) : 400;
  $: CARD_HEIGHT = IS_MOBILE ? (windowWidth < 576 ? 320 : 280) : 250;
  $: PHASE_SPACING = IS_MOBILE ? CARD_HEIGHT : 400;
  $: IMAGE_SIZE = 350;


  $: phases = [
    {
      id: 1,
      title: "Phase 1: Discovery and Platform Vision",
      image: phase1.src,
      bullets: [
        "Map existing tools, environments, and infrastructure usage",
        "Quantified developer pain points and inefficiencies",
        "Define Platform scope",
      ],
    },
    {
      id: 2,
      title: "Phase 2: Platform Architecture and Design",
      image: phase2.src,
      bullets: [
        "Architecture blueprint emphasizing low variance and modularity",
        "Standards for infrastructure, security, deployment, and access",
        "MVP validating essential capabilities and architectural direction",
      ],
    },
    {
      id: 3,
      title: "Phase 3: Build and Implementation",
      image: phase3.src,
      bullets: [
        "Platform runtime with container orchestration and a defined scaling model",
        "Version-controlled IaC for reproducible environments",
        "CI/CD pipelines for consistent, verified deployments",
        "Integrated tooling for auth, observability, and incident analysis",
      ],
    },
    {
      id: 4,
      title: "Phase 4: Developer Onboarding and Adoption",
      image: phase4.src,
      bullets: [
        "Self-service access governed by RBAC and least-privilege permissions",
        "Zero-trust policies for service access, secrets, and communication",
        "Hands-on onboarding via sessions, demos, and support",
        "Reduced onboarding time for new hires",
      ],
    },
    {
      id: 5,
      title: "Phase 5: Upgrades and Day-2 Operations",
      image: phase5.src,
      bullets: [
        "Continuous refinement of templates, pipelines, and guardrails",
        "Ongoing maintenance, reliability upgrades, and advisory support",
      ],
    },
  ].map((p, i) => ({
    ...p,
    y: START_Y + i * PHASE_SPACING,
    cx: IS_MOBILE ? CENTER_X : i % 2 === 0 ? 650 : 250,
    cy: START_Y + i * PHASE_SPACING,
    imageCx: i % 2 === 0 ? 250 : 650,
  }));

  $: TOTAL_HEIGHT = (START_Y + phases.length * PHASE_SPACING) - 160;

  $: dPath = (() => {
    let pathStr = `M ${CENTER_X},0`;

    phases.forEach((p, i) => {
      const prevY = i === 0 ? 0 : phases[i - 1].y;
      const prevX = i === 0 ? CENTER_X : phases[i - 1].cx;

      if (IS_MOBILE) {
        pathStr += ` L ${CENTER_X},${p.y - 20}`;
      } else {
        const cp1y = prevY + (p.y - prevY) * 0.5;
        const cp2y = prevY + (p.y - prevY) * 0.5;

        const cp1x = prevX;
        const cp2x = p.cx;

        pathStr += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p.cx},${p.y}`;
      }
    });
    return pathStr;
  })();

  function cleanupAnimations() {
    gsap.killTweensOf(".ball01");
    gsap.killTweensOf(path);

    if (scrollTriggerId) {
      const trigger = ScrollTrigger.getById(scrollTriggerId);
      if (trigger) {
        trigger.kill();
      }
    }

    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.trigger === "#timeline-container") {
        st.kill();
      }
    });
  }

  function setupAnimations() {
    if (!path || typeof window === "undefined") return;

    cleanupAnimations();

    gsap.set(".ball01", {
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 0,
      x: 0,
      y: 0,
    });

    gsap.set(".ball:not(.ball01)", {
      autoAlpha: 0,
      scale: 0,
    });

    if (!IS_MOBILE) {
      gsap.set(".phase-image", {
        opacity: 0,
      });
    }

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    scrollTriggerId = "timeline-scroll-" + Date.now();

    const action = gsap.timeline({
      scrollTrigger: {
        id: scrollTriggerId,
        trigger: "#timeline-container",
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
        invalidateOnRefresh: true,
        onRefresh: () => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length });
        },
      },
      defaults: { ease: "none" },
    });

    action
      .to(".ball01", { autoAlpha: 1, duration: 0.01 })
      .to(path, { strokeDashoffset: 0, duration: 1 }, 0)
      .to(
        ".ball01",
        {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          duration: 1,
          ease: "none",
        },
        0
      );

    phases.forEach((phase) => {
      const pathLength = path.getTotalLength();
      let minDistance = Infinity;
      let progress = 0;

      for (let i = 0; i <= 500; i++) {
        const testProgress = i / 500;
        const point = path.getPointAtLength(testProgress * pathLength);
        const distance = Math.sqrt(
          Math.pow(point.x - phase.cx, 2) + Math.pow(point.y - phase.cy, 2)
        );

        if (distance < minDistance) {
          minDistance = distance;
          progress = testProgress;
        }
      }

      action.to(
        `.content-${phase.id}`,
        {
          autoAlpha: 1,
          borderColor: "rgba(34, 197, 94, 0.5)",
          boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)",
          duration: 0.01,
          ease: "power2.out",
        },
        progress - 0.030
      );

      action.to(
        `.ball-${phase.id}`,
        {
          autoAlpha: 1,
          scale: 1.2,
          duration: 0.05,
          ease: "elastic.out(1, 0.3)",
        },
        progress - 0.030
      );

      if (!IS_MOBILE) {
        action.to(
          `.image-${phase.id}`,
          {
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          progress - 0.030
        );
      }
    });

    ScrollTrigger.refresh();
  }

  let resizeTimeout;
  let previousIsMobile;

  function handleResize() {
    if (!isInitialized) return;

    const currentIsMobile = windowWidth < 768;

    if (previousIsMobile !== currentIsMobile) {
      previousIsMobile = currentIsMobile;

      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setupAnimations();
      }, 100);
    }
  }

  $: if (isInitialized && windowWidth) {
    handleResize();
  }

  onMount(() => {
    gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
    windowWidth = window.innerWidth;
    previousIsMobile = windowWidth < 768;

    requestAnimationFrame(() => {
      setupAnimations();
      isInitialized = true;
    });

    return () => {
      cleanupAnimations();
      clearTimeout(resizeTimeout);
    };
  });
  let gradientX = 45.5;
  let gradientY = -200;

</script>

<svelte:window bind:innerWidth={windowWidth} />

<div
  id="timeline-container"
  class="relative overflow-hidden font-sans"
>
  <div class="flex relative">
    <svg
      id="svg"
      bind:this={svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${IS_MOBILE ? windowWidth : VIEWBOX_WIDTH} ${TOTAL_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      class="h-auto overflow-visible relative z-10 w-full"
    >
      <path
        class="theDottedLine"
        d={dPath}
        fill="none"
        stroke="#22c55e"
        stroke-width="1px"
        stroke-linecap="round"
        stroke-dasharray="8 12"
        opacity="0.4"
      />

      <path
        bind:this={path}
        class="theGreenLine"
        d={dPath}
        fill="none"
        stroke="#22c55e"
        stroke-width="1px"
        stroke-linecap="round"
      />

      <circle
        class="ball ball01 fill-white stroke-green-600 stroke-2"
        cx={CENTER_X}
        cy="0"
        r="5"
      ></circle>

      {#each phases as phase}
        <circle
          class={`ball ball-${phase.id} fill-green-500 stroke-neutral-900 stroke-4`}
          cx={phase.cx}
          cy={phase.y}
          r="8"
          style="opacity: 0; transform: scale(0); transform-origin: center;"
        ></circle>
      {/each}

      {#each phases as phase}
        <foreignObject
         x={IS_MOBILE ? 0 : phase.cx - CARD_WIDTH / 2}
          y={phase.y - CARD_HEIGHT / 2}
          width={IS_MOBILE ? windowWidth : CARD_WIDTH}
          class="overflow-visible"
        >
          <Card.Root
            class={`shadow-nav text-center overflow-hidden content-${phase.id}`}
            on:mousemove={(event) => updateGradient(event)}
            style={`--gradient-x: ${gradientX}px; --gradient-y: ${gradientY}px; backdrop-filter: blur(6px); border-color: var(--card-border);`}
          >
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="card-custom-inner"
              on:mousemove={(event) => updateGradient(event)}
              style={`--gradient-x: ${gradientX}px; --gradient-y: ${gradientY}px;`}
            >
              <Card.Header class="md:px-3 md:pt-3">
                <div class="flex items-center gap-2">
                  <span
                    class="text-green-500 font-mono px-2 pt-1 text-xs rounded-full bg-green-500/10 border border-green-500/20"
                    >Phase {phase.id}</span
                  >
                </div>
              </Card.Header>
              <Card.Content class="pt-3 md:p-3">
                <Card.Title
                  class="text-fifth-color md:text-sm text-left font-manrope"
                >
                  {phase.title.split(": ")[1]}
                </Card.Title>
                <ul class="flex flex-col gap-2 pt-2">
                  {#each phase.bullets as bullet}
                    <li
                      class="text-left text-xs font-inter text-fourth-color flex items-start"
                    >
                      <span class="text-green-500/50 flex-shrink-0 mr-2">•</span>
                      <span class="w-full break-words">{bullet}</span>
                    </li>
                  {/each}
                </ul>
              </Card.Content>
            </div>
          </Card.Root>
        </foreignObject>
      {/each}

      {#if !IS_MOBILE}
        {#each phases as phase, index}
          <foreignObject
            x={index % 2 == 0 ? phase.imageCx - 50 - IMAGE_SIZE / 2 : phase.imageCx + 50 - IMAGE_SIZE / 2 }
            y={phase.y - 30 - IMAGE_SIZE / 2}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            class="overflow-visible"
          >
            <div class="w-full h-full flex items-center justify-center image-{phase.id} phase-image">
              <img 
                src={phase.image} 
                alt={`Phase ${phase.id}`}
                class="w-full h-full object-cover"
              />
            </div>
          </foreignObject>
        {/each}
      {/if}
    </svg>
  </div>
</div>
