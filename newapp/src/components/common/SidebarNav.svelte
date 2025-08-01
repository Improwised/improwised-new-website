<script lang="ts">
  import { onMount } from "svelte";
  import { innerWidth } from "svelte/reactivity/window";
  import { ChevronRight, ChevronDown } from "lucide-svelte";
  import Button from "../ui/button/button.svelte";

  interface Sections {
    title: string;
    id: string;
    children: {
      title: string;
      id: string;
    }[];
  }
  export let sections: Sections[];
  export let insideMdx: string;

  export let activeSection: Sections = {
    id: "",
    title: "",
    children: [],
  };
  let showPageBar = false;
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function showActiveTitle(
    sectionElements: {
      title: string;
      id: string;
      element: HTMLElement | null;
      children: {
        title: string,
        id: string,
        element: HTMLElement | null;
      }[]
    }[],
    heroSection: HTMLElement | null
  ) {
    sectionElements.forEach((sec) => {
      const rect = sec.element?.getBoundingClientRect();

      if ((rect?.top as number) <= 130 && (rect?.bottom as number) > 100) {
        activeSection.id = sec.id;
        activeSection.title = sec.title;
      }

      if (sec.children) {
        sec.children.forEach((child) => {
          const boudingRect = child.element?.getBoundingClientRect();

          if ((boudingRect?.top as number) <= 130 && (boudingRect?.bottom as number) > 100) {
            activeSection.id = child.id;
            activeSection.title = child.title;
          }
        })
      }
    });

    const heroRect = heroSection?.getBoundingClientRect();
    if (window.scrollY > (heroRect?.height as number)) {
      showPageBar = true;
    } else {
      showPageBar = false;
    }
  }

  onMount(() => {
    const sectionElements = sections.map((section) => {
      let childtag: { title: string, id: string, element: HTMLElement | null }[] = [];
      if (section.children) {
        childtag = (section.children).map((tag) => ({
          title: tag.title,
          id: tag.id,
          element: document.getElementById(tag.id),
        }))
      } 
      return {
        title: section.title,
        id: section.id,
        element: document.getElementById(section.id),
        children: childtag
      };
    });
    
    const heroSection = document.getElementById("section1");
    const activeTitle = () => showActiveTitle(sectionElements, heroSection);
    window.addEventListener("scroll", activeTitle);
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("#sidebar-button")) {
        isMenuOpen = false;
      }
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", activeTitle);
      window.removeEventListener("click", handleClick);
    };
  });
</script>

<div
  class={`sidebar w-full max-lg:mt-3 transition-all duration-250 flex flex-col gap-3 ${(innerWidth.current as number) < 1024 && showPageBar && insideMdx == "outside" ? "block" : (innerWidth.current as number) > 1024 && insideMdx == "inside" ? "block" : "hidden"}`}
>
  <!-- Mobile menu button -->
  <div class="group lg:hidden z-40 grid grid-cols-[140px_1fr] items-center">
    <Button
      variant="outline"
      id="sidebar-button"
      class="bg-transparent hover:bg-none w-max"
      on:click={(event) => {
        event.stopPropagation();
        toggleMenu();
      }}
    >
      <span class="text-[12px]">On this page</span>
      {#if isMenuOpen}
        <div><ChevronDown class="transition-all h-4 w-4 duration-200" /></div>
      {:else}
        <div><ChevronRight class="transition-all h-4 w-4 duration-200" /></div>
      {/if}
    </Button>
    <div
      class="text-xs font-manrope sm:small-text text-first-color line-clamp-1"
    >
      {activeSection.title}
    </div>
  </div>

  <!-- Sidebar Navigation -->
  <nav aria-label="Sidebar"
    class={`lg:block blog-scrollbar-hide sticky top-28 max-h-[calc(100vh-35rem)] lg:max-h-[calc(100vh-7rem)] overflow-y-scroll ${isMenuOpen ? "block" : "hidden"} overflow-y-auto h-fit`}
  >
    <div>
      <p class="font-bold font-manrope text-2xl mb-3">Table of Contents</p>
    </div>
    <div class="flex flex-col gap-4">
      {#each sections as section}
        <a
          href={`#${encodeURIComponent(section.id)}`}
          class={`block font-semibold font-manrope text-[14px] hover:text-blue-hover ${activeSection.id == section.id ? "text-blue-hover border-l-2 border-white" : "text-first-color"} md:text-[16px] md:leading-[24px] tracking-[0.02em`}
        >
          {section.title}
        </a>
        {#if section.children}
          {#each section.children as childtag}
            <div class="flex flex-col gap-4 ml-3.5">
              <a
                href={`#${encodeURIComponent(childtag.id)}`}
                class={`block font-semibold font-manrope text-[14px] hover:text-blue-hover ${activeSection.id == childtag.id ? "text-blue-hover border-l-2 border-white" : "text-first-color"} md:text-[16px] md:leading-[24px] tracking-[0.02em`}
              >
                {childtag.title}
              </a>
            </div>
          {/each}
        {/if}
      {/each}
    </div>
  </nav>
</div>
