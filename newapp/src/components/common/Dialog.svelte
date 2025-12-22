<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Search } from "lucide-svelte";
</script>

<Dialog.Root>
  <Dialog.Trigger class="button-bg rounded-md outline-0">
    <Button
      class="button-bg flex gap-2 cursor-pointer"
      aria-label="Open full page search modal"
    >
     <Search class="h-4 w-4" />
      Ctrl K
    </Button>
    <!-- <span class="hidden sm:inline">Ctrl K</span> -->
  </Dialog.Trigger>
  <Dialog.Content
    class="sm:max-w-3xl max-h-[600px] search-dialog-content flex flex-col"
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
