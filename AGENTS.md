<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep developer prices in their original currency; public displays use shared pricing helpers and a cached public exchange-rate server function to avoid inconsistent conversion or invented rates.
- Use the shared BookingButton for consultation CTAs so on-site Calendly booking is consistent while email message forms remain separate.
- Prebundle React and the booking dialog together in Vite to prevent first-use optimization from mixing React module instances in the preview.
