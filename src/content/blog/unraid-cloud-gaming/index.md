---
title: "Create Your Own Gaming Cloud  Unraid"
summary: "How to build your own gaming cloud with Unraid, Parsec, and Steam."
date: "May 10 2024"
draft: false
tags:
  - Unraid
---

> **Unraid + Parsec + Steam = Gaming Cloud**

If you have an Unraid server, it's time to retire your gaming PC!  
In this article, we’ll go step-by-step through how to create your own **low-latency gaming cloud**, accessible from anywhere in the world (and of course, locally too!).

> ⚠️ **Note:** If you play games with intrusive anti-cheats (like _Vanguard_), skip this tutorial those programs don’t allow virtual machines.

---

## Prerequisites

To follow this tutorial, you’ll need:

- An **Unraid server** with a **GPU** (any model works this guide uses an NVIDIA RTX 2070 Super)
- At least **8 GB of free RAM** beyond your normal use  
  (e.g., if Unraid + Docker usually use 8 GB, make sure you have 16 GB total)
- A **CPU with 4+ cores**
- A **Windows 11 ISO**, downloaded from the official Microsoft website, stored in an accessible Unraid share
- A **fast Internet connection** if you plan to use the setup remotely

---

## 1. Create a Windows 11 Virtual Machine

### Enable VM Manager

1. Log into your **Unraid dashboard**.
2. Go to **Settings → VM Manager**.
3. Enable VMs if not already active.
4. Select the **latest VirtIO drivers** (used for disks, NICs, etc.).

### Enable PCIe Passthrough

Switch to **Advanced View** (top-right corner), then activate:

- **PCIe ACS override:** set to _Both_

This allows you to attach your GPU to the VM.

### Create the VM

Go to **VMs → Add VM → Windows 11**.  
You’ll see a configuration screen like this:

Machine: Q35 (latest generation)
CPU:
Memory:
Primary vDisk size: 64G
Windows ISO: <path/to/windows.iso>
VirtIO ISO: <path/to/virtio.iso>

> 💡 Be sure to keep the “G” when specifying disk size (e.g., `100G`).

Then set **VM Console Keyboard** according to your layout and **Create + Start** the VM.

---

## 2. Install Windows 11

Open the **VNC Console** if it hasn’t appeared automatically.

If you see `Press any key to boot from CD`, do so immediately otherwise restart the VM.

Proceed with the Windows installation until you reach the **partition screen**:

### Load VirtIO Drivers

You won’t see any drives at first. Click **Load driver**, then choose:

virtio → viostor → w11 → amd64 → viostor.inf

Once the disk appears, select it and continue installation.

### Bypass Internet Requirement

When you reach the language/config screen:

1. Press `Shift + F10`
2. Type the following command:

```bash
OOBE\BYPASSNRO
```

3. Windows will restart.

Now you can set up the installation offline.
When asked about the Internet connection, select:
• “I don’t have internet”
• “Continue with limited setup”

Proceed normally until you reach the Windows desktop.

---

## 3. Configure Windows

Welcome to your new Windows 11 VM!

Install VirtIO Drivers

Open File Explorer → VirtIO CD, then run:

virtio-win-guest-tools.exe

Click through the installation. This installs all necessary drivers (network, storage, etc.).

Power Settings

1.  Open Control Panel → Power Options
2.  Enable the High performance plan
3.  In “Change plan settings,” set:
    • Turn off display: Never
    • Put the computer to sleep: Never

Enable Remote Desktop

1.  Search for Remote Desktop Settings
2.  Enable Remote Desktop
3.  Open Command Prompt (Admin) and run:

```bash
ipconfig
```

4. Note your IPv4 address (e.g., `192.168.1.16`)

Then shut down the VM.

---

## 4. Add a GPU (Passthrough)

Assign GPU to VM

1.  In Unraid, edit your VM.
2.  Under Graphics Card, choose your GPU (e.g., RTX 2070 Super).
3.  For Sound Card, also select the GPU’s audio output.

Update and start the VM.

Connect via Remote Desktop

On another PC (same network):

1.  Open Microsoft Remote Desktop
2.  Click Add PC
3.  Enter the VM’s IPv4 address
4.  Log in with your VM credentials
5.  Accept the certificate if prompted

Once connected, install the appropriate GPU drivers:
• NVIDIA: Download here
• AMD: Download here

⚠️ Some GPUs won’t work without a monitor connected.
You can use a headless HDMI plug to bypass this limitation.

---

## 5. Low-Latency Game Streaming

Now your GPU is working let’s set up streaming.

Install Parsec & Steam on the VM

1.  Install Parsec and Steam
    (both on your VM and any client device)
2.  During Parsec installation, select “Shared” mode.

Configure Parsec Host Settings

In Parsec, go to Settings → Host and set both of these to the maximum your connection allows:
• Bandwidth limit
• Resolution / FPS

You can now close your Remote Desktop session (leave the VM running).

Remote Access Anywhere

From any other PC:

1.  Open Parsec and log in
2.  Your VM should appear in the list
3.  Connect and play!

---

Alternative: Steam Link

If Parsec isn’t available (e.g., on iOS), use Steam Link:

1.  Install Steam Link on your device
2.  On your VM, open Steam → Settings → Remote Play → Enable
3.  Pair Steam Link:
    • If on the same network: auto-detects
    • Otherwise: pair manually with PIN

And that’s it!
You now have your own personal gaming cloud, running on your Unraid server.

---

Credits

Special thanks to:
• Space Invader One
• Superboki
• The Unraid Discord community

…and everyone who helped me learn Unraid.

Feedback is welcome this was my first tutorial!
If something’s unclear or could be improved, let me know!

---
