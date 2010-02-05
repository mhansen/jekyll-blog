---
title: Changing the Minix3 Bootimage
layout: post
categories:
    - minix
---

(or, how to add a device driver to Minix3 without bricking your bootimage)

In this tutorial, we will duplicate the Minix memory device driver. The memory
driver is a very small driver, and can serve as a simple working implementation
of the driver interface. Once we have duplicated the driver, we will test it by
modifying it, adding a new minor device to it, that retrieves the system
uptime. Note: I will be using Minix 3.1.4 for the examples.

Background
----------

When you read from a file in Minix3, execution passes through the file system
and device driver:

  * `read(fd, &buf, bytes)` call from a user-space program (e.g. `/bin/cat`)
    passes a message to the filesystem (`/usr/src/servers/vfs`)
  * the filesystem dispatches to a device driver, based on its table mapping major
    device numbers to device driver process numbers in `/usr/src/servers/vfs/dmap.c`.
  * The device driver recieves a message from the filesystem, and performs the read
    call.

We must add information about the driver to files in `/usr/src/`: 
  * `drivers/Makefile` - organises compilation of drivers
  * `kernel/table.c` - this defines the programs in the bootimage
  * `tools/Makefile` - defines the location of files in the bootimage
  * `include/minix/com.h` - defines process numbers of drivers
  * `servers/vfs/dmap.c`, - defines device major-number -> device process 
     number mappings

1: Duplicate the memory driver
------------------------------

    $ cd /usr/src/drivers/
    $ cp -r memory mydriver

Now, add a line to the `/usr/src/drivers/Makefile`, in the `all install depend
clean:` section, telling it to compile whatever's in the `mydriver` directory.
Put it in just before the memory driver, as the memory driver must be last for
some reason.

    cd ./mydriver && $(MAKE) $@

Also, we want our driver to run when the computer boots - we want it in the
bootimage. So add a line to the `bootimage` section of the makefile, again,
just before the memory driver:

    cd ./mydriver && $(MAKE) build

You can test that this works by observing the make program enter your
`mydriver` directory:

    $ cd /usr/src/drivers
    $ make
    $ make image

2: Add the driver to the bootimage
----------------------------------

This is a big step, and if something goes wrong, your new system image will not
boot. Don't worry! Minix gives you the option to boot into the original,
working image instead, if something goes wrong.

First, give your new driver a process number. Edit
`/usr/src/include/minix/com.h`, and find where `INIT_PROC_NR` is defined. These
task numbers are indexes into the bootimage table defined in `kernel/table.c`,
and INIT must be last. So increment `INIT_PROC_NR` and insert
`MYDRIVER_PROC_NR` just before INIT

    #define MYDRIVER_PROC_NR    9
    #define INIT_PROC_NR        10 

Now, edit `/usr/src/kernel/table.c`, and add in the new driver just before INIT
in the process table, again. The last three lines of my `bootimage image[]`
look like:

    {VM_PROC_NR,        0,SRV_F, 32,      2, 0,  SRV_T, SRV_M, c(vm_c), "vm"    },
    {MYDRIVER_PROC_NR,  0,SVM_F,  4,      3, 0,  SRV_T, SYS_M, c(mem_c),"mydriver"},
    {INIT_PROC_NR,      0,USR_F,  8, USER_Q, 0,  USR_T, USR_M, no_c,    "init"  },

I just copied the fields from the memory device's line, changing the process
number and name. The order is important - it must be consistent throughout the
files dealing with the bootimage (`kernel/table.c`, `tools/Makefile`, and
`include/minix/com.h`), or your system will not boot.

Next, edit `/usr/src/tools/Makefile`. This file specifies the parameters passed
to the program that constructs the bootimage, in the `PROGRAMS` variable. Add a
line to this, just before `../servers/init/init`:

    ../drivers/mydriver/memory

`memory` is the name of the driver program produced by the Makefile in
mydriver. You'll probably want to change this at some point. When you do,
change the reference in `tools/Makefile` too.

The driver's now added to the bootimage. Try recompiling the system, and
rebooting into the new boot image.

    $ cd /usr/src/tools
    $ make install
    $ shutdown

If all goes well, your system should reboot happily, and as the kernel starts,
listing the programs in the bootimage, you will see `mydriver` before `init`.
If not, try booting into the old (working) bootimage, and run a `make fresh
install` from `/usr/src/tools`, which will recompile everything from source
(and take a long time).

Excellent! There are now two memory drivers running. However, we can't use the
new one - the filesystem doesn't know about it yet - it doesn't have a major
device number.

3. Add the device to the File Server
------------------------------------
Edit `/usr/src/servers/vfs/dmap.c`. In this file, there is a `struct dmap dmap`
containing a mapping from major device number to process number, and other
info.  Find a major device number (index in the table) that is marked 'not
used' (on my system, #9 was not used), and replace it with data copied from the
memory device driver above, changing `MEM_PROC_NR` to `MYDRIVER_PROC_NR` and
`"memory"` to `"mydriver"`.

    DT(1, gen_opcl, gen_io, MYDRIVER_PROC_NR, 0, "mydriver")

Now, calls to that major device number will dispatch to the handlers defined in
`/usr/src/drivers/mydriver`. You can modify these routines to execute arbitrary
code, and return anything. 

To make a special file to access this new driver, use `mknod` to make a
character special file:

    $mknod [filename] c [major number] [minor number]

You can then access your driver through this special file, as you would any
other file.
