---
title: "Applying Seccomp Profiles from OCI Registries in CRI-O"
slug: "applying-seccomp-profiles-oci-registries-crio"
description: "Learn how to apply Seccomp profiles directly from OCI registries in CRI-O to improve container security and simplify profile management."
seoTitle: "Applying Seccomp Profiles in CRI-O via OCI Registries | Improwised"
seoDescription: "Discover how to apply Seccomp profiles from OCI registries in CRI-O. Improwised explains best practices to strengthen container runtime security."
tags: [CRI-O, Seccomp profiles, OCI registries, container security, Kubernetes, runtime security, platform engineering, Improwised]
publishDate: 2025-09-15
modifiedDate: 2025-09-15
author: "Improwised Editorial Team" 
image: '$lib/images/blogs/applying-seccomp-profiles-oci-registries-crio-head-light.svg'
darkImage: '$lib/images/blogs/applying-seccomp-profiles-oci-registries-crio-head-dark.svg'
bodyImage: "$lib/images/blogs/crio-seccomp-automation-container-security-oci-registry-workflow.png"
linkTags: 
  - title: "Distributing Seccomp Profiles in Kubernetes" 
  - title: "CRI-O's solution"
  - title: "OCI Artifacts as Seccomp Profiles"
  - title: "Configuring CRI-O"
  - title: "Applying Seccomp Profiles"
  - title: "Management of OCI Artifacts Internally"
  - title: "Limitations and Future Work"
  - title: "Technical Details of CRI-O's Implementation"
  - title: "Conclusion"
---
Seccomp is a feature in the Linux kernel that allows the sandboxing of process privileges by limiting userspace system calls into the kernel. Kubernetes can apply seccomp profiles to pods and containers; however, distributing the seccomp profiles to the nodes creates a huge problem. In this blog post, we will discuss how CRI-O (a Kubernetes container runtime) solves this problem by applying seccomp profiles from OCI registries.

## Distributing Seccomp Profiles in Kubernetes

In Kubernetes, seccomp profiles are typically applied from a local path. For example:

```kubernetes

apiVersion: v1
kind: Pod
metadata:
 name: pod
spec:
 containers:
 - name: container
   image: nginx:1.25.3
   securityContext:
     seccompProfile:
       type: Localhost
       localhostProfile: nginx-1.25.3.json

```

The nginx-1.25.3.json profile has to be in the root directory for the kubelet, plus the seccomp directory. If the profile location is not reachable, the runtime will fail to create the container.

![Applying Seccomp Profiles from OCI Registries in CRI-O]($lib/images/blogs/crio-seccomp-automation-container-security-oci-registry-workflow.png)

## CRI-O's solution

CRI-O has added new annotations that allow users to specify seccomp profiles for containers or pods via OCI artifacts. These new annotations are:

- seccomp-profile.kubernetes.cri-o.io/CONTAINER for a specific container
- seccomp-profile.kubernetes.cri-o.io/POD for every container within a pod
- seccomp-profile.kubernetes.cri-o.io/POD or seccomp-profile.kubernetes.cri-o.io/CONTAINER for a whole container image

CRI-O will respect these annotations if they are allowed to be used and if the workload is not set to Unconfined; otherwise, the value from the securityContext is effective.

## OCI Artifacts as Seccomp Profiles

To use an OCI artifact as a seccomp profile, you can specify it in the pod annotation:

```kubernetes

apiVersion: v1
kind: Pod
metadata:
 name: pod
annotations:
 seccomp-profile.kubernetes.cri-o.io/POD: quay.io/crio/seccomp:v2
spec: ...

```

The quay.io/crio/seccomp:v2 image has a seccomp.json file that contains the content of the actual profile. You can use ORAS or Skopeo to see the contents of the image.

## Configuring CRI-O

For CRI-O to utilize the annotation, you will need to add it to the runtime configuration array of allowed annotations. You could do so using a drop-in configuration file.

## Applying Seccomp Profiles

After CRI-O is configured, the seccomp profile can be applied to a given container or the whole pod by using the annotation. For example:

```kubernetes

apiVersion: v1
kind: Pod
metadata:
 name: pod
annotations:
 seccomp-profile.kubernetes.cri-o.io/container: quay.io/crio/seccomp:v2
spec:
 containers:
 - name: container
   image: nginx:1.25.3

```

Using the seccomp annotation, CRI-O will pull the OCI artifact and apply the seccomp profile to the 
container.

## Linking Seccomp Profiles to Container Images

You can also add seccomp profiles to published container images by using image annotations. For example, Podman enables you to specify the annotation at image build.

## Management of OCI Artifacts Internally

CRI-O manages OCI artifacts like regular files internally, giving additional benefits for managing stacks of seccomp profiles. Managing seccomp profiles this way provides you with an efficient way to manage seccomp profiles, providing an efficient way for you to manage and update seccomp profiles.

## Limitations and Future Work

Currently, CRI-O only works with Unconfined workloads, and moving forward, it may include supporting multiple layers in a single OCI artifact and potentially resolve this limitation as well.

## Technical Details of CRI-O's Implementation

CRI-O's implementation of pulling the seccomp profile application from OCI registries relies on several technical aspects. When creating a pod, CRI-O looks for the seccomp-profile.kubernetes.cri-o.io annotation. If it finds the annotation, it will pull the correct OCI artifact and extract the seccomp.json file.

The seccomp.json file contains the actual seccomp profile, which is then applied to the container by CRI-O using the seccomp API provided by the Linux kernel. CRI-O uses the libseccomp library to load the seccomp profile and apply it whenever a new container is created for each of the containers in the pod.

## Security Considerations

If you are going to use CRI-O to apply seccomp profiles from OCI registries, you have to consider security issues. The OCI artifact with the seccomp profile has to be trusted, as it can restrict or allow system calls that impact the container or the host's security.

Also, the seccomp-profile.kubernetes.cri-o.io annotation must be set up correctly to ensure that only the desired seccomp profiles are being applied. Failing to configure the profile correctly can create security concerns or unexpected behaviour.

## Conclusion

CRI-O's support for applying seccomp profiles from OCI registries provides a technical workaround to the problem of distributing seccomp profiles in Kubernetes. Using an OCI artifact to store and distribute seccomp profiles is deemed to be a technically less challenging way of managing seccomp profiles and offers a more reasonable and secure way of managing container workloads.
