---
title: "Créer son propre cloud gaming avec Unraid"
summary: "Comment monter son propre cloud gaming avec Unraid, Parsec et Steam."
date: "May 10 2024"
draft: false
tags:
  - Unraid
---

> **Unraid + Parsec + Steam = Cloud gaming**

Si vous avez un serveur Unraid, il est temps de mettre votre PC gaming à la retraite !
Dans cet article, on va voir étape par étape comment créer votre propre **cloud gaming à faible latence**, accessible depuis n'importe où dans le monde (et bien sûr en local aussi).

> ⚠️ **Remarque :** si vous jouez à des jeux avec des anticheats intrusifs (comme _Vanguard_), passez votre chemin. Ces logiciels n'autorisent pas les machines virtuelles.

---

## Prérequis

Pour suivre ce tutoriel, il vous faut :

- Un **serveur Unraid** avec un **GPU** (n'importe quel modèle fonctionne, ce guide utilise une NVIDIA RTX 2070 Super)
- Au moins **8 Go de RAM libre** en plus de votre usage habituel
  (par exemple, si Unraid + Docker utilisent déjà 8 Go, prévoyez 16 Go au total)
- Un **CPU avec 4 cœurs ou plus**
- Une **ISO Windows 11**, téléchargée depuis le site officiel de Microsoft et stockée sur un partage Unraid accessible
- Une **connexion Internet rapide** si vous comptez utiliser l'installation à distance

---

## 1. Créer une machine virtuelle Windows 11

### Activer le VM Manager

1. Connectez-vous à votre **dashboard Unraid**.
2. Allez dans **Settings → VM Manager**.
3. Activez les VM si ce n'est pas déjà fait.
4. Sélectionnez les **derniers drivers VirtIO** (utilisés pour les disques, les cartes réseau, etc.).

### Activer le PCIe Passthrough

Passez en **Advanced View** (en haut à droite), puis activez :

- **PCIe ACS override :** réglez sur _Both_

Cela permet d'attacher votre GPU à la VM.

### Créer la VM

Allez dans **VMs → Add VM → Windows 11**.
Vous arrivez sur un écran de configuration comme celui-ci :

Machine: Q35 (dernière génération)
CPU:
Memory:
Primary vDisk size: 64G
Windows ISO: <chemin/vers/windows.iso>
VirtIO ISO: <chemin/vers/virtio.iso>

> 💡 Pensez à garder le « G » quand vous indiquez la taille du disque (par exemple `100G`).

Réglez ensuite le **VM Console Keyboard** selon votre disposition, puis **Create + Start** la VM.

---

## 2. Installer Windows 11

Ouvrez la **console VNC** si elle ne s'affiche pas automatiquement.

Si vous voyez `Press any key to boot from CD`, faites-le immédiatement, sinon redémarrez la VM.

Poursuivez l'installation de Windows jusqu'à l'**écran de partitionnement** :

### Charger les drivers VirtIO

Vous ne verrez aucun disque au début. Cliquez sur **Load driver**, puis choisissez :

virtio → viostor → w11 → amd64 → viostor.inf

Une fois le disque visible, sélectionnez-le et continuez l'installation.

### Contourner l'obligation de connexion Internet

Une fois arrivé à l'écran de langue/configuration :

1. Appuyez sur `Shift + F10`
2. Tapez la commande suivante :

```bash
OOBE\BYPASSNRO
```

3. Windows va redémarrer.

Vous pouvez maintenant continuer l'installation hors ligne.
Quand la question sur la connexion Internet apparaît, sélectionnez :
• « Je n'ai pas de connexion Internet »
• « Continuer avec une installation limitée »

Poursuivez normalement jusqu'au bureau Windows.

---

## 3. Configurer Windows

Bienvenue sur votre nouvelle VM Windows 11 !

Installer les drivers VirtIO

Ouvrez l'Explorateur de fichiers → CD VirtIO, puis lancez :

virtio-win-guest-tools.exe

Suivez l'installation. Cela installe tous les drivers nécessaires (réseau, stockage, etc.).

Paramètres d'alimentation

1.  Ouvrez le Panneau de configuration → Options d'alimentation
2.  Activez le mode Performances élevées
3.  Dans « Modifier les paramètres du mode », réglez :
    • Mettre en veille l'écran : Jamais
    • Mettre en veille l'ordinateur : Jamais

Activer le Bureau à distance

1.  Cherchez Paramètres du Bureau à distance
2.  Activez le Bureau à distance
3.  Ouvrez l'Invite de commandes (Admin) et lancez :

```bash
ipconfig
```

4. Notez votre adresse IPv4 (par exemple `192.168.1.16`)

Éteignez ensuite la VM.

---

## 4. Ajouter un GPU (Passthrough)

Assigner le GPU à la VM

1.  Dans Unraid, éditez votre VM.
2.  Dans Graphics Card, choisissez votre GPU (par exemple la RTX 2070 Super).
3.  Pour Sound Card, sélectionnez aussi la sortie audio du GPU.

Mettez à jour et démarrez la VM.

Se connecter en Bureau à distance

Depuis un autre PC (même réseau) :

1.  Ouvrez Microsoft Remote Desktop
2.  Cliquez sur Add PC
3.  Entrez l'adresse IPv4 de la VM
4.  Connectez-vous avec les identifiants de la VM
5.  Acceptez le certificat si demandé

Une fois connecté, installez les drivers GPU appropriés :
• NVIDIA : Télécharger ici
• AMD : Télécharger ici

⚠️ Certains GPU ne fonctionnent pas sans écran branché.
Vous pouvez utiliser un adaptateur HDMI factice pour contourner cette limitation.

---

## 5. Streaming de jeu à faible latence

Votre GPU fonctionne, passons au streaming.

Installer Parsec et Steam sur la VM

1.  Installez Parsec et Steam
    (sur la VM et sur tout appareil client)
2.  Pendant l'installation de Parsec, choisissez le mode « Shared ».

Configurer Parsec côté hôte

Dans Parsec, allez dans Settings → Host et réglez au maximum ce que votre connexion permet :
• Bandwidth limit
• Resolution / FPS

Vous pouvez maintenant fermer votre session Bureau à distance (laissez la VM tourner).

Accès à distance depuis n'importe où

Depuis n'importe quel autre PC :

1.  Ouvrez Parsec et connectez-vous
2.  Votre VM devrait apparaître dans la liste
3.  Connectez-vous et jouez !

---

Alternative : Steam Link

Si Parsec n'est pas disponible (par exemple sur iOS), utilisez Steam Link :

1.  Installez Steam Link sur votre appareil
2.  Sur votre VM, ouvrez Steam → Settings → Remote Play → activez
3.  Appairez Steam Link :
    • Sur le même réseau : détection automatique
    • Sinon : appairage manuel avec un code PIN

Et voilà !
Vous avez maintenant votre propre cloud gaming personnel, qui tourne sur votre serveur Unraid.

---

Remerciements

Un grand merci à :
• Space Invader One
• Superboki
• La communauté Discord d'Unraid

... et à tous ceux qui m'ont aidé à apprendre Unraid.

Les retours sont les bienvenus, c'était mon premier tutoriel !
Si quelque chose n'est pas clair ou peut être amélioré, dites-le-moi.

---
