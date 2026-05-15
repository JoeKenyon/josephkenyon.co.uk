---
title: "Beatles Music Ontology"
description: "Metadata exploration of Beatles music using RDF and SPARQL."
image: "./gdsfgdfgdf.png"
---

This project presents an ontology (IRI: `http://example.org/beatles/`) designed to represent and explore metadata related to The Beatles’ music.

The ontology models key musical concepts such as tracks, albums, performers, production roles, and instruments. The ontology was created using **Protégé**, where the core classes and properties (**T-Box**) were defined and saved in OWL (.owl) format. 

The **A-Box** was populated using **Python**, primarily with the help of the `rdflib` and `SPARQLWrapper` libraries then saved as an owl file. 

The primary objective was to build an ontology capable of combining information from multiple external sources and making it easily queryable. To achieve this, data was collected from the **WASABI SPARQL endpoint** and enriched using the **MusicBrainz** and **AcousticBrainz** API. 

{% image "./Pasted image 20260219174401.png", "Ontology Class Hierarchy" %}

This enabled the integration of the following types of data:
* Track and Album data (title, tracklist, duration)
* Track contributions (writers, composers, lyricists, translators)
* Performance data (musicians, instruments, vocal roles)
* Production details (engineers, producers, technical roles)
* Studio and location information (recording, mixing, editing)
* Acoustic and tonal metadata (BPM, key, tuning frequency, danceability)

{% image "./Pasted image 20260219174415.png", "SPARQL Query Results" %}