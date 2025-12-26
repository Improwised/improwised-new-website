<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Search } from "lucide-svelte";

</script>

<Dialog.Root>
  <Dialog.Trigger class="rounded-md outline-0">
    <Button
      class="hidden button-bg lg:flex gap-2 cursor-pointer"
      aria-label="Open full page search modal"
    >
     <Search class="h-4 w-4" />
      <span>Search</span>
    </Button>
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
