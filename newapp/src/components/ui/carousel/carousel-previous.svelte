<script lang="ts">
	import ArrowLeft from "lucide-svelte/icons/arrow-left";
	import type { VariantProps } from "tailwind-variants";
	import { getEmblaContext } from "./context.js";
	import { cn } from "$lib/utils.js";
	import {
		Button,
		type Props,
		type buttonVariants,
	} from "$lib/components/ui/button/index.js";

	type $$Props = Props;

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let variant: VariantProps<typeof buttonVariants>["variant"] = "outline";
	export let size: VariantProps<typeof buttonVariants>["size"] = "icon";

	const { orientation, canScrollPrev, scrollPrev, handleKeyDown } =
		getEmblaContext("<Carousel.Previous/>");
</script>

<Button
	{variant}
	{size}
	class={cn(
		"h-[52px] w-[52px] rounded-xl border border-[#E5E5E5] hover:bg-carousel-btn hover:text-carousel-btn-text hover:border-slate-600",
		className
	)}
	disabled={!$canScrollPrev}
	on:click={scrollPrev}
	on:keydown={handleKeyDown}
	{...$$restProps}
>
	<ArrowLeft class="h-6 w-6" />
	<span class="sr-only">Previous slide</span>
</Button>
