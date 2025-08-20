<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb";
  export let currentUrl: string[] = [];
  export let servicePage: string = "";
  export let blockPage: string = "";
  
</script>

<div class="mt-16">
  <Breadcrumb.Root>
    <Breadcrumb.List class="justify-center">
      <Breadcrumb.Item>
        <Breadcrumb.Link href='/' class="hover:text-blue-hover">Home</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator/>
      <Breadcrumb.Item>
        <Breadcrumb.Link href={`/services/${currentUrl.at(-3)}/`} class="hover:text-blue-hover">{servicePage}</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page class="hover:text-blue-hover">{blockPage}</Breadcrumb.Page>
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>
</div>
