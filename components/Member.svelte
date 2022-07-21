<script lang="ts">
  let className = '';
  export { className as class };

  export let id;
  export let name;
  export let pic;
  export let bgColor = 'bg-gray-200';
  export let textColor = 'text-black';
</script>

<span
  class="{className}
    px-2 py-1 rounded
    inline-block tracking-tightest
    {bgColor} {textColor}"
>
  {pic}
  {name}
</span>
