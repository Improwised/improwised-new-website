<script lang="ts">
  import { onMount } from "svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Search } from "lucide-svelte";

  let open = false;

  onMount(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        open = true;
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<Dialog.Root bind:open={open}>
  <Dialog.Trigger class="rounded-md outline-0">
    <Button
      class="hidden button-bg lg:flex gap-2 cursor-pointer"
      aria-label="Open full page search modal"
    >
     <Search class="h-4 w-4" />
      <span>Ctrl K</span>
    </Button>
    <Search class="h-5 w-5 lg:hidden cursor-pointer" />
  </Dialog.Trigger>
  <Dialog.Content
    class="max-w-3xl max-h-[600px] search-dialog-content flex flex-col"
  >
    <Dialog.Header class="border-b border-[var(--card-border)]">
      <Dialog.Title class="text-2xl font-bold text-[var(--text-first-color)]"
        >Search</Dialog.Title
      >
    </Dialog.Header>
    <div class="flex-1 overflow-y-auto overflow-x-hidden">
      <slot />
    </div>
  </Dialog.Content>
</Dialog.Root>
