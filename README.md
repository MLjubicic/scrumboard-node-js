# Scrum Board mit Node.js


## Eindruck nach der Arbeit:
Meine Stärke und Vorliebe ist definitiv nicht das Programmieren - vor allem nicht Web Entwicklung (abe im Beruf relativ wenig mit SW-Entwicklung zu tun (höchstens in der Automatisierung oder rudimentäres Scripting)).
Daher war das schon ein grosser Brocken für mich und ich habe nach ca. 20 nervenaufreibenden Stunden und viel frickelei beschliessen müssen, mich mit dem vorliegenden Resultat zufrieden zu geben.
Es ist hässlich und nicht durchgängig sauber programmiert. Tests mit Jasmine wären auch sinnvoll gewesen - da hätte ich aber locker noch ein paar Stunden draufschlagen können.

## Ausgewählte Techniken:
- Node.js - vorgeschrieben
- Backbone (mit jQuery und Underscore)
- REST
- Bootstrap (für noch schönere CSS effekte)
- Auf die Verwendung von Websockets wurde aus zeitlichen Komplexitätsgründen verzichtet

## Heroku
Auf Heroku crasht der server ständig, lokal läuft die Applikation jedenfalls.


## Funktionsweise
- Neue Tasks mittels Formular hinzufügen (kommen direkt in den "Open"-Bereich
- Tasks lassen sich mittels Pfeilen zwischen den Zuständen hin und her schieben
- Tasks lassen sich löschen
- Attribute lassen sich mittels doppelklick editieren (wenn auch etwas fummelig und nicht konsistent)
