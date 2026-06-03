export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // non-www → www
    if (url.hostname === 'cristalstudios.com') {
      url.hostname = 'www.cristalstudios.com';
      return Response.redirect(url.toString(), 301);
    }

    // OAuth para Decap CMS
    if (url.pathname === '/auth') {
      const redirect = new URL('https://github.com/login/oauth/authorize');
      redirect.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      redirect.searchParams.set('scope', 'repo,user');
      redirect.searchParams.set('redirect_uri', `${url.origin}/auth/callback`);
      return Response.redirect(redirect.toString(), 302);
    }

    if (url.pathname === '/auth/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('Código ausente', { status: 400 });

      const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const data = await res.json();
      const token = data.access_token;
      if (!token) return new Response('Falha na autenticação: ' + JSON.stringify(data), { status: 400 });

      const payload = JSON.stringify({ token, provider: 'github' });
      const html = `<!DOCTYPE html><html><body><script>
(function(){
  var msg = 'authorization:github:success:' + ${JSON.stringify(payload)};
  function recv(e){ window.removeEventListener('message',recv); window.opener.postMessage(msg, e.origin); setTimeout(function(){ window.close(); }, 500); }
  window.addEventListener('message', recv);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;

      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }

    return env.ASSETS.fetch(request);
  },
};
