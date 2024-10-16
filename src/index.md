---
title: Hello World
layout: base.njk
---

<h2>Releases</h2>
<div class='release-list'>
{% for release in collections.releases reversed %}
  <div class='release-item'>
    <div class='release-thumb'>
      <iframe style="border: 0; width: 100%; height: 100%;" src="https://bandcamp.com/EmbeddedPlayer/{{release.data.type}}={{release.data.bandcampid}}/size=large/bgcol=111111/linkcol=0687f5/minimal=true/transparent=true/" seamless></iframe>
    </div>
  </div>
{% endfor %}
</div>
