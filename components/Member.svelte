<script lang="ts">
  let className = '';
  export { className as class };

  export let id;
  export let name;
  export let pic;
  export let bgColor = 'bg-gray-200';
  export let textColor = 'text-black';

  // TODO stop it from being a button
</script>

<button
  on:click
  id="member_{id}"
  value={id}
  class="{className}
    px-2 py-1 rounded
    inline-block tracking-tightest
    {bgColor} {textColor}"
>
  {pic}
  {name}
</button>
