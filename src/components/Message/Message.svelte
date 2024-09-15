<script>
    export let text = '';
</script>

<div class="message">
    <p>{text}</p>
</div>

<style>
    .message {
        -webkit-text-stroke: 1px black;
        display: flex;
        justify-content: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        align-items: center;
        color: yellow;
        font-family: Arial;
        font-weight: 700;
        font-size: 52px;
        width: 400px;
        background: radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(61,61,61,0.2) 86%, rgba(255,255,255,0) 100%);
        border-top: 1px solid yellow;
        border-bottom: 1px solid yellow;
        opacity: 0;
        animation: fadeIn 1s forwards;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
