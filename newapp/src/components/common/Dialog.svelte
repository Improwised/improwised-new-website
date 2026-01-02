<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Search } from "lucide-svelte";
  import { onMount } from "svelte";

  let open = $state(false);

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      open = true;
    }
  }

  onMount(() => {
    // Handle mobile search trigger
    const mobileTrigger = document.getElementById('mobile-search-trigger');
    const handleMobileClick = () => {
      open = true;
    };
    
    if (mobileTrigger) {
      mobileTrigger.addEventListener('click', handleMobileClick);
    }

    return () => {
      if (mobileTrigger) {
        mobileTrigger.removeEventListener('click', handleMobileClick);
      }
    };
  });

  $effect(() => {
    if (open) {
      setTimeout(() => {
        const event = new CustomEvent('search-dialog-opened');
        window.dispatchEvent(event);
      }, 50);
    }
  });
</script>

<svelte:document onkeydown={handleKeydown} />

<Dialog.Root bind:open>
  <Dialog.Trigger class="rounded-md outline-0">
    <div
      class="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg border border-[color-mix(in_srgb,var(--text-second-color)_30%,transparent)] bg-transparent transition-all cursor-pointer"
      role="button"
      tabindex="0"
      aria-label="Open full page search modal"
    >
      <span class="text-[var(--text-second-color)] text-sm flex-1">Search...</span>
      <kbd class="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold text-[var(--text-second-color)] bg-[color-mix(in_srgb,var(--text-second-color)_8%,transparent)] border border-[color-mix(in_srgb,var(--text-second-color)_20%,transparent)] rounded">
        <span class="text-xs">Ctrl</span>
        <span class="text-xs">K</span>
      </kbd>
    </div>
    <Search class="h-5 w-5 lg:hidden cursor-pointer" />
  </Dialog.Trigger>
  <Dialog.Content
    class="max-w-[95vw] max-h-[80vh] sm:max-w-2xl lg:max-w-3xl sm:max-h-[600px] search-dialog-content flex flex-col"
  >
    <Dialog.Header class="border-b border-[var(--card-border)]">
      <Dialog.Title class="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--text-first-color)]"
        >Search</Dialog.Title
      >
    </Dialog.Header>
    <div class="flex-1 overflow-y-auto overflow-x-hidden">
      <slot />
    </div>
  </Dialog.Content>
</Dialog.Root>
