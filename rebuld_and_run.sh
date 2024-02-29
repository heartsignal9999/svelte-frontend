# src/rebuild_and_run.sh
sudo systemctl stop heartsignal-svelte.service
npm run build
sudo systemctl start heartsignal-svelte.service