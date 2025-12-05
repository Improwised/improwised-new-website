<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { MotionPathPlugin } from "gsap/MotionPathPlugin";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import * as Card from "$lib/components/ui/card";

  export let phases;
  console.log("phases-0----", phases);
  

  let svg;
  let path;
  let windowWidth;
  let scrollTriggerId = null;
  let isInitialized = false;

  const VIEWBOX_WIDTH = 900;
  const START_Y = 450;
  const CENTER_X = VIEWBOX_WIDTH / 2;

  $: IS_MOBILE = windowWidth < 768;
  $: PHASE_SPACING = IS_MOBILE ? (windowWidth < 576 ? 900 : 700) : 700;
  // $: CARD_WIDTH = IS_MOBILE ? 280 : 350;
  // $: CARD_HEIGHT = IS_MOBILE ? 320 : 280;
  $: CARD_WIDTH = IS_MOBILE ? (windowWidth < 576 ? 900 : 750) : 500;
  $: CARD_HEIGHT = IS_MOBILE ? (windowWidth < 576 ? 600 : 430) : 400;

  $: LABEL_SIZE = windowWidth < 576 ? "28px" : windowWidth < 768 ? "16px" : "12px";
  $: TITLE_SIZE = windowWidth < 576 ? "32px" : windowWidth < 768 ? "24px" : "22px";
  $: TITLE_LINE_HEIGHT = windowWidth < 576 ? "34px" : windowWidth < 768 ? "26px" : "28px";
  $: DESC_SIZE = windowWidth < 576 ? "28px" : windowWidth < 768 ? "18px" : "16px";
  $: DESC_LINE_HEIGHT = windowWidth < 576 ? "32px" : windowWidth < 768 ? "24px" : "24px";
  $: BULLET_SIZE = windowWidth < 576 ? "28px" : windowWidth < 768 ? "19px" : "16px";
  $: BULLET_LINE_HEIGHT = windowWidth < 576 ? "30px" : windowWidth < 768 ? "24px" : "20px";
  $: CARD_PADDING = windowWidth < 576 ? "26px" : windowWidth < 768 ? "16px" : "16px";
  $: SECTION_GAP = windowWidth < 576 ? "32px" : windowWidth < 768 ? "20px" : "16px";
  $: BULLET_GAP = windowWidth < 576 ? "16px" : windowWidth < 768 ? "12px" : "10px";

  $: phases = [
    {
      id: 1,
      title: "Phase 1: Discovery and Platform Vision",
      description:
        "We align the platform with business priorities and delivery targets. The focus is to identify exactly what is slowing engineering velocity, how teams currently build and deploy, and what the platform must solve",
      bullets: [
        "Factual Mapping of existing tools, environments, and infrastructure usage.",
        "Quantified developer pain points and inefficiencies.",
        "Defined Platform scope: a statement of what the platform will solve.",
      ],
    },
    {
      id: 2,
      title: "Phase 2: Platform Architecture and Design",
      description:
        "We define how the platform will be structured and how different components will work together.",
      bullets: [
        "An architecture blueprint that minimizes variance and supports modular evolution.",
        "Defined standards for how infrastructure, security, deployments, and access will be handled",
        "An MVP of the platform that demonstrates essential capabilities in a realistic environment and validates the architectural approach.",
      ],
    },
    {
      id: 3,
      title: "Phase 3: Build and Implementation",
      description:
        "We implement the core platform using the selected tooling and established standards.",
      bullets: [
        "A running platform environment backed by container orchestration with the agreed scaling and resource model.",
        "Fully version-controlled infrastructure provisioning using IaC for environment reproducibility.",
        "CI/CD pipelines, enabling consistent and verified deployments.",
        "Integrated operational tooling across auth, observability, and incident analysis.",
      ],
    },
    {
      id: 4,
      title: "Phase 4: Developer Onboarding and Adoption",
      description:
        "We ensure developers can adopt the platform smoothly and incorporate it into their daily workflow",
      bullets: [
        " Self-service access governed by RBAC and least-privilege permissions",
        "Zero-trust policy applied for service access, secrets handling, and internal communication.",
        "Hands-on onboarding through sessions, walkthrough demos, and real support for developer queries.",
        "Reduced onboarding time for new hires.",
      ],
    },
    {
      id: 5,
      title: "Phase 5: Upgrades and Day-2 Operations",
      description:
        "We continuously refine the platform and support its growth in alignment with business and engineering needs.",
      bullets: [
        "Iterative enhancement of templates, pipelines, and guardrails based on real developer needs.",
        "Advanced cost management and governance policies.",
        "Continuous platform maintenance, reliability improvements, upgrades, and advisory support.",
      ],
    },
  ].map((p, i) => ({
    ...p,
    y: START_Y + i * PHASE_SPACING,
    cx: IS_MOBILE ? CENTER_X : i % 2 === 0 ? 650 : 250,
    cy: START_Y + i * PHASE_SPACING,
  }));

  $: TOTAL_HEIGHT = START_Y + phases.length * PHASE_SPACING;

  $: dPath = (() => {
    let pathStr = `M ${CENTER_X},0`;

    phases.forEach((p, i) => {
      const prevY = i === 0 ? 0 : phases[i - 1].y;
      const prevX = i === 0 ? CENTER_X : phases[i - 1].cx;

      if (IS_MOBILE) {
        pathStr += ` L ${CENTER_X},${p.y}`;
      } else {
        const cp1y = prevY + (p.y - prevY) * 0.5;
        const cp2y = prevY + (p.y - prevY) * 0.5;

        const cp1x = prevX;
        const cp2x = p.cx;

        pathStr += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p.cx},${p.y}`;
      }
    });

    const lastPhase = phases[phases.length - 1];
    if (IS_MOBILE) {
      pathStr += ` L ${CENTER_X},${TOTAL_HEIGHT}`;
    } else {
      pathStr += ` C ${lastPhase.cx},${lastPhase.y} ${CENTER_X},${lastPhase.y} ${CENTER_X},${TOTAL_HEIGHT - 100}`;
    }

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

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    scrollTriggerId = "timeline-scroll-" + Date.now();

    const action = gsap.timeline({
      scrollTrigger: {
        id: scrollTriggerId,
        trigger: "#timeline-container",
        start: "top center",
        end: "bottom bottom",
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
      const progress = phase.y / TOTAL_HEIGHT;

      action.to(
        `.content-${phase.id}`,
        {
          autoAlpha: 1,
          borderColor: "rgba(34, 197, 94, 0.5)",
          boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)",
          duration: 0.01,
          ease: "power2.out",
        },
        progress - 0.025
      );

      action.to(
        `.ball-${phase.id}`,
        {
          autoAlpha: 1,
          scale: 1.2,
          duration: 0.05,
          ease: "elastic.out(1, 0.3)",
        },
        progress
      );
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
  class="w-full min-h-[175vh] md:min-h-[280vh] relative overflow-hidden font-sans"
>
  <div class="flex justify-center relative py-[6vh] md:py-[12vh]">
    <svg
      id="svg"
      bind:this={svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${TOTAL_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      class="w-full sm:max-w-[900px] h-auto overflow-visible relative z-10"
    >
      <path
        class="theDottedLine"
        d={dPath}
        fill="none"
        stroke="#22c55e"
        stroke-width="2px"
        stroke-linecap="round"
        stroke-dasharray="8 12"
        opacity="0.3"
      />

      <path
        bind:this={path}
        class="theGreenLine"
        d={dPath}
        fill="none"
        stroke="#22c55e"
        stroke-width="2px"
        stroke-linecap="round"
      />

      <circle
        class="ball ball01 fill-white stroke-green-600 stroke-2"
        cx={CENTER_X}
        cy="0"
        r="8"
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
          x={phase.cx - CARD_WIDTH / 2}
          y={phase.y - CARD_HEIGHT / 2}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          class="overflow-visible"
        >
          <Card.Root
            class={`shadow-nav text-center overflow-hidden h-full box-border content-${phase.id}`}
            on:mousemove={(event) => updateGradient(event)}
            style={`--gradient-x: ${gradientX}px; --gradient-y: ${gradientY}px; backdrop-filter: blur(6px)`}
          >
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="card-custom-inner"
              on:mousemove={(event) => updateGradient(event)}
              style={`--gradient-x: ${gradientX}px; --gradient-y: ${gradientY}px;`}
            >
              <Card.Header style={`padding: ${CARD_PADDING}`}>
                <div class="flex items-center gap-2">
                  <span
                    class="text-green-500 font-mono px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20"
                    style={`font-size: ${LABEL_SIZE}`}
                    >Phase {phase.id}</span
                  >
                </div>
              </Card.Header>
              <Card.Content style={`padding: ${CARD_PADDING}; display: flex; flex-direction: column; gap: ${SECTION_GAP}`}>
                <Card.Title
                  class="text-left text-fifth-color tracking-[0.02em] font-manrope"
                  style={`font-size: ${TITLE_SIZE}; line-height: ${TITLE_LINE_HEIGHT}; margin: 0`}
                >
                  {phase.title.split(": ")[1]}
                </Card.Title>
                <p
                  class="text-left tracking-[0.02em] font-normal font-inter text-fourth-color"
                  style={`font-size: ${DESC_SIZE}; line-height: ${DESC_LINE_HEIGHT}; margin: 0`}
                >
                  {phase.description}
                </p>

                <ul style={`display: flex; flex-direction: column; gap: ${BULLET_GAP}; margin: 0; padding: 0; list-style: none`}>
                  {#each phase.bullets as bullet}
                    <li
                      class="text-neutral-500 text-left font-normal flex items-start"
                      style={`font-size: ${BULLET_SIZE}; line-height: ${BULLET_LINE_HEIGHT}; gap: ${BULLET_GAP}`}
                    >
                      <span class="text-green-500/50 flex-shrink-0" style="margin-top: 2px">•</span>
                      <span class="w-full break-words">{bullet}</span>
                    </li>
                  {/each}
                </ul>
              </Card.Content>
            </div>
          </Card.Root>
          <!-- <div
            class={`content-${phase.id} 
              backdrop-blur-xl 
              border border-white/10 
              p-3 md:p-5 rounded-2xl shadow-xl 
              transform transition-all duration-300
              h-full flex flex-col justify-center
            `}
          >
            <div class="flex items-center gap-2 mb-2">
              <span
                class="text-green-500 font-mono md:text-xs px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20"
                >Phase {phase.id}</span
              >
            </div>
            <h3
              class="font-bold md:text-base mb-2 leading-tight w-full break-words"
            >
              {phase.title.split(": ")[1]}
            </h3>
            <p
              class="text-neutral-400 md:text-xs mb-2 md:mb-3 leading-relaxed w-full break-words"
            >
              {phase.description}
            </p>

            <ul class="space-y-1 md:space-y-1.5">
              {#each phase.bullets as bullet}
                <li
                  class="text-neutral-500 md:text-[10px] flex items-start gap-1 md:gap-2"
                >
                  <span class="text-green-500/50 mt-0.5">•</span>
                  <span class="w-full break-words">{bullet}</span>
                </li>
              {/each}
            </ul>
          </div> -->
        </foreignObject>
      {/each}
    </svg>
  </div>
</div>
