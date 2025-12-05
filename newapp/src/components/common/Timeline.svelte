<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let svg;
  let path;
  let windowWidth;
  
  // Spacing variables
  const VIEWBOX_WIDTH = 900;
  const CARD_WIDTH = windowWidth < 768 ? 200 : 350;
  const CARD_HEIGHT = windowWidth < 768 ? 140 : 280;
  const PHASE_SPACING = 500;
  const START_Y = 300;
  const IS_MOBILE = windowWidth < 768;
  const CENTER_X = VIEWBOX_WIDTH / 2;
  
  // Calculate phase Y positions dynamically
  const phases = [
    {
      id: 1,
      title: "Phase 1: Discovery and Platform Vision",
      description: "We align the platform with business priorities and delivery targets. The focus is to identify exactly what is slowing engineering velocity, how teams currently build and deploy, and what the platform must solve",
      bullets: [
        "Factual Mapping of existing tools, environments, and infrastructure usage.",
        "Quantified developer pain points and inefficiencies.",
        "Defined Platform scope: a statement of what the platform will solve."
      ]
    },
    {
      id: 2,
      title: "Phase 2: Platform Architecture and Design",
      description: "We define how the platform will be structured and how different components will work together.",
      bullets: [
        "An architecture blueprint that minimizes variance and supports modular evolution.",
        "Defined standards for how infrastructure, security, deployments, and access will be handled",
        "An MVP of the platform that demonstrates essential capabilities in a realistic environment and validates the architectural approach."
      ]
    },
    {
      id: 3,
      title: "Phase 3: Build and Implementation",
      description: "We implement the core platform using the selected tooling and established standards.",
      bullets: [
        "A running platform environment backed by container orchestration with the agreed scaling and resource model.",
        "Fully version-controlled infrastructure provisioning using IaC for environment reproducibility.",
        "CI/CD pipelines, enabling consistent and verified deployments.",
        "Integrated operational tooling across auth, observability, and incident analysis."
      ]
    },
    {
      id: 4,
      title: "Phase 4: Developer Onboarding and Adoption",
      description: "We ensure developers can adopt the platform smoothly and incorporate it into their daily workflow",
      bullets: [
        " Self-service access governed by RBAC and least-privilege permissions",
        "Zero-trust policy applied for service access, secrets handling, and internal communication.",
        "Hands-on onboarding through sessions, walkthrough demos, and real support for developer queries.",
        "Reduced onboarding time for new hires."
      ]
    },
     {
      id: 5,
      title: "Phase 4:  Upgrades and Day-2 Operations",
      description: "We continuously refine the platform and support its growth in alignment with business and engineering needs.",
      bullets: [
        "Iterative enhancement of templates, pipelines, and guardrails based on real developer needs.",
        "Advanced cost management and governance policies.",
        "Continuous platform maintenance, reliability improvements, upgrades, and advisory support."
      ]
    }
  ].map((p, i) => ({
    ...p,
    y: START_Y + (i * PHASE_SPACING),
    // Calculate alternating X position for card centers
    // Even indices (0, 2...) -> Right side
    // Odd indices (1, 3...) -> Left side
    // Center of SVG is 450 (VIEWBOX_WIDTH / 2)
    // Left card center: 250
    // Right card center: 650
    cx: (i % 2 === 0) ? 650 : 250,
    cy: START_Y + (i * PHASE_SPACING)
  }));

  // Total height needed
  const TOTAL_HEIGHT = START_Y + (phases.length * PHASE_SPACING) + 200;
  
  // Construct path data string
  // M center,0 -> Curve to first point -> Curve to second point ...
  // Using Cubic Bezier (C) for smooth connections between points
  // Start at top center
  let dPath = `M ${CENTER_X},0`;
  
  phases.forEach((p, i) => {
    const prevY = i === 0 ? 0 : phases[i-1].y;
    const prevX = i === 0 ? CENTER_X : phases[i-1].cx;
    
    // Control points for smooth curve
    // cp1y is 1/3 down from prevY
    // cp2y is 2/3 down to currY
    const cp1y = prevY + (p.y - prevY) * 0.5;
    const cp2y = prevY + (p.y - prevY) * 0.5;
    
    // Control points X logic: pull towards the curve direction
    const cp1x = prevX;
    const cp2x = p.cx;
    
    dPath += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p.cx},${p.y}`;
  });
  
   // Add a tail to the path
  const lastPhase = phases[phases.length - 1];
  dPath += ` C ${lastPhase.cx},${lastPhase.y} ${CENTER_X},${lastPhase.y} ${CENTER_X},${TOTAL_HEIGHT - 100}`;

  onMount(() => {
    gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
    windowWidth = window.innerWidth;

    // Initial states
    gsap.set(".ball", { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    // Cards are visible initially but dimmed
    // gsap.set(".content-card", { autoAlpha: 0.3, y: 0, borderColor: "rgba(255, 255, 255, 0.1)" });
    
    // Prepare the path for drawing effect
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const action = gsap.timeline({
      scrollTrigger: {
        trigger: "#timeline-container",
        start: "top center",
        end: "bottom bottom",
        scrub: 0.5,
      },
      defaults: { ease: "none" }
    });

    action
      .to(".ball01", { autoAlpha: 1, duration: 0.01 })
      .to(path, { strokeDashoffset: 0, duration: 1 }, 0)
      .to(".ball01", {
        motionPath: {
          path: ".theGreenLine",
          align: ".theGreenLine",
          alignOrigin: [0.5, 0.5]
        },
        duration: 1,
        ease: "none"
      }, 0);

    // Add content reveals
    phases.forEach((phase, i) => {
      const progress = phase.y / TOTAL_HEIGHT;
      
      // Highlight the card as the line passes
      action.to(`.content-${phase.id}`, { 
        autoAlpha: 1, 
        borderColor: "rgba(34, 197, 94, 0.5)", // green-500/50
        boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)",
        duration: 0.01, 
        ease: "power2.out" 
      }, progress - 0.025); // Trigger exactly when hitting
      
      // Reset the card as we pass it (optional - user said "scrolled up the boxes goes invisible", 
      // but also "user still be able to see those boxes".
      // The scrub will handle reversing this animation when scrolling up automatically.
      // So when scrolling up, it will go back to autoAlpha: 0.3 and gray border.
      
      action.to(`.ball-${phase.id}`, {
        autoAlpha: 1,
        scale: 1.2,
        duration: 0.05,
        ease: "elastic.out(1, 0.3)"
      }, progress);
    });
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div id="timeline-container" class="w-full min-h-[175vh] md:min-h-[280vh] relative overflow-hidden font-sans">

  <div class="flex justify-center relative py-[6vh] md:py-[12vh]">
    <!-- SVG Layer -->
    <!-- Mobile: height auto, width 100% -->
    <!-- Desktop: Max width controlled -->
    <svg 
      id="svg" 
      bind:this={svg} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${TOTAL_HEIGHT}`} 
      preserveAspectRatio="xMidYMid meet"
      class="w-full md:max-w-[900px] h-auto overflow-visible relative z-10"
    >
      
      <!-- The Curved Path -->
      <path 
        bind:this={path}
        class="theGreenLine" 
        d={dPath}
        fill="none" 
        stroke="#22c55e" 
        stroke-width="2px" 
        stroke-linecap="round"
      />
      
      <!-- Moving Ball -->
      <circle class="ball ball01 fill-white stroke-primary2  stroke-2" cx="25" cy="25" r="8"></circle>
      
      <!-- Intersection Balls -->
      {#each phases as phase}
        <circle 
          class={`ball ball-${phase.id} fill-green-500 stroke-neutral-900 stroke-4`} 
          cx={phase.cx} 
          cy={phase.y} 
          r="8" 
          style="opacity: 0; transform: scale(0); transform-origin: center;"
        ></circle>
      {/each}

      <!-- Phases -->
      {#each phases as phase}
        <!-- Content Card -->
        <!-- Centered on the point (cx, cy) -->
        <!-- x = cx - (width/2) -->
        <!-- y = cy - (height/2) -->
        <foreignObject 
          x={phase.cx - (CARD_WIDTH / 2)} 
          y={phase.y - (CARD_HEIGHT / 2)} 
          width={CARD_WIDTH} 
          height={CARD_HEIGHT} 
          class="overflow-visible"
        >
          <div 
            class={`content-card content-${phase.id} 
              bg-neutral-900 backdrop-blur-xl 
              border border-white/10 
              p-3 md:p-5 rounded-2xl shadow-xl 
              transform transition-all duration-300
              h-full flex flex-col justify-center
            `}
          >
            {#if !IS_MOBILE}
              <div class="flex items-center gap-2 mb-2">
                <span class="text-green-500 font-mono text-xs px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">Phase {phase.id}</span>
              </div>
              <h3 class="text-white font-bold text-base mb-2 leading-tight w-full break-words">{phase.title.split(': ')[1]}</h3>
              <p class="text-neutral-400 text-xs mb-3 leading-relaxed w-full break-words">{phase.description}</p>
              
              <ul class="space-y-1.5">
                {#each phase.bullets as bullet}
                  <li class="text-neutral-500 text-[10px] flex items-start gap-2">
                    <span class="text-green-500/50 mt-0.5">•</span>
                    <span class="w-full break-words">{bullet}</span>
                  </li>
                {/each}
              </ul>
            {:else}
              <div class="text-center">
                <div class="flex items-center justify-center gap-2 mb-2">
                  <span class="text-green-500 font-mono text-xs px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">Phase {phase.id}</span>
                </div>
                <h3 class="text-white font-bold text-sm leading-tight w-full break-words">{phase.title.split(': ')[1]}</h3>
              </div>
            {/if}
          </div>
        </foreignObject>
      {/each}

    </svg>
  </div>
</div>

<style>
  /* Custom scrollbar for webkit */
  /* :global(::-webkit-scrollbar) {
    width: 8px;
  }
  :global(::-webkit-scrollbar-track) {
    background: #0a0a0a;
  }
  :global(::-webkit-scrollbar-thumb) {
    background: #333;
    border-radius: 4px;
  }
  :global(::-webkit-scrollbar-thumb:hover) {
    background: #444;
  } */
</style>
