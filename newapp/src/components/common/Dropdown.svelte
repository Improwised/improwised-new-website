<script lang="ts">
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  export let services: string | any[] = [];
  export let baseUrl: string = "";
  export let currentUrl: string[] = [];
  let width: number = 0;
  let align: "center" | "start" | "end" | undefined;
  $: align = width < 500 ? 'center' : 'start';
</script>

<svelte:window bind:innerWidth={width} />

<DropdownMenu.Root preventScroll={false}>
  <DropdownMenu.Trigger class={`group flex items-center space-x-1 hover:cursor-pointer ${currentUrl.includes("services") ? "text-blue-hover" : "text-first-color"}`}>
    <span class="small-text group-hover:text-blue-hover">Services</span>
    <ChevronRight class="w-4 h-4 group-hover:text-blue-hover" />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="start" class="rounded-[6px] dropdown-bg border-0 p-[15px]">
    <DropdownMenu.Group>
      {#if services.length > 0}
        {#each services as service}
          {#if service.data.blocks.length > 0 && service.data.slug == "platform-engineering"}
            <div class="flex justify-between group">
              <DropdownMenu.Item class="p-[10px] small-text text-first-color group-hover:text-blue-hover">
                <a href={`${baseUrl}/services/${service?.data.slug}/`}  aria-label="Explore ${service?.data?.title}">
                  {service?.data?.title || 'Service Details'}
                </a>
              </DropdownMenu.Item>
              <DropdownMenu.Root preventScroll={false}>
                <DropdownMenu.Trigger class="relative flex items-center space-x-1 hover:cursor-pointer">
                  <ChevronRight class="w-4 h-4 group-hover:text-blue-hover" />
                </DropdownMenu.Trigger>
                  <DropdownMenu.Content {align} class="rounded-[6px] dropdown-bg md:-mt-8 md:ml-[2.3rem] min-w-[16rem] border-0 p-[15px]" subMenu={true}>
                    <DropdownMenu.Group>
                      {#each service.data.blocks as block}
                        <DropdownMenu.Item class="p-[10px] small-text text-first-color hover:text-blue-hover">
                          <a href={`${baseUrl}/services/${service?.data.slug}/${block.slug}/`}  aria-label="Explore ${block.title}">
                            {block.title || 'Service Details'}
                          </a>
                        </DropdownMenu.Item>
                      {/each}
                    </DropdownMenu.Group>
                  </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          {:else}
            <DropdownMenu.Item class="p-[10px] small-text text-first-color hover:text-blue-hover">
              <a href={`${baseUrl}/services/${service?.data.slug}/`}  aria-label="Explore ${service?.data?.title}">
                {service?.data?.title || 'Service Details'}
              </a>
            </DropdownMenu.Item>
          {/if}
        {/each}
      {/if}
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
