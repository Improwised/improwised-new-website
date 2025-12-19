---
title: "Manage/import the OpenTofu resource indirectly created by OpenTofu"
slug: "manage-import-opentofu-resources-indirect-creation"
description: "Complete guide to managing and importing OpenTofu resources that were created indirectly. Master state management, resource tracking, and infrastructure reconciliation techniques."
seoTitle: "OpenTofu Resource Import Guide: Indirect Creation Management | Improwised"
seoDescription: "Learn to import & manage OpenTofu resources created indirectly. State management, resource tracking, and infrastructure reconciliation best practices. | Improwised"
tags: [OpenTofu, terraform alternative, infrastructure as code, resource import, state management, IaC, cloud infrastructure, terraform migration, resource tracking, infrastructure automation]
publishDate: 2025-09-01
modifiedDate: 2025-09-01
author: "Improwised Editorial Team" 
image: "$lib/images/blogs/manage-import-opentofu-resources-indirect-creation-head-light.svg"
darkImage: "$lib/images/blogs/manage-import-opentofu-resources-indirect-creation-head-dark.svg"
bodyImage: "$lib/images/blogs/indirect-resource-management-in-opentofu.png"
linkTags:
  - title: "Understanding Indirect Resource Creation" 
  - title: "Issues with indirect resource management"
  - title: "Ways of using indirectly created resources"
  - title: "Import Indirect Resources"
  - title: "Conclusion"
---

OpenTofu is an open-source tool that enables users to create and manage different resources like configuration files, templates, etc. Sometimes, OpenTofu's resources can be indirectly created by other applications that integrate with OpenTofu. So, if this is the case for you, it is important to understand how to manage and import those resources.

![Manage/import the OpenTofu resource indirectly created by OpenTofu]($lib/images/blogs/indirect-resource-management-in-opentofu.png)

## Understanding Indirect Resource Creation
OpenTofu allows you to create resources indirectly through several means, such as:

* **Scripting:** OpenTofu features a scripting API, allowing developers to create resources programmatically. This can be construed as indirect resource creation, as they did not directly create the resources.  
* **Plugin Extensions:** OpenTofu plugins can also create resources indirectly, e.g., as an output of the plugin's operation.  
* **Automated Workflows:** Automated workflows, such as batch processing scripts, can indirectly create resources when executing OpenTofu commands and scripts.

## Issues with indirect resource management

There are several issues with the use of indirectly created resources, such as:

* **Lack of visibility:** Indirectly created resources cannot be visible right away since they are not visible to the OpenTofu interface.  
* **Resource identification naming convention consistency:** Indirect resources may have varied naming conventions that make identification challenging.  
* **Dependency management:** Once they are in place, indirectly created resources might have dependencies on other resources. This can create complex dependencies, which make them challenging to manage.

## Ways of using indirectly created resources

Here are a few ways of using indirectly created resources as part of your OpenTofu workflow:

1. **Resource scanning**

One way is to take advantage of the OpenTofu resource directory scanning for newly created resources. This can be accomplished using OpenTofu's API or by developing your own custom script to iterate through the directory.
 
```
import os
import opentofu

# Get the OpenTofu resource directory
resource_dir = opentofu.get_resource_directory()

# Scan the resource directory for new resources
for root, dirs, files in os.walk(resource_dir):
    for file in files:
        # Check if the file is a new resource
        if file not in opentofu.get_known_resources():
            print(f"New resource found: {file}")
```

2. **Event-Driven Resource Management**

Another method is to take advantage of OpenTofu's event-driven system to see when new resources are created. You could register an event listener that listens specifically for resource creation events.

```
import opentofu

# Register an event listener for resource creation events
def on_resource_created(event):
    print(f"Resource created: {event.resource_name}")

opentofu.register_event_listener(opentofu.EVENT_RESOURCE_CREATED, on_resource_created)
```

3. **Resource Serialization**

Resource serialization is simply saving the resource data to a database or file, so that it can be managed and imported more easily. OpenTofu includes a serialization API that can be used to serialize resources.

```
import opentofu

# Get the resource to serialize
resource = opentofu.get_resource("my_resource")

# Serialize the resource to a file
with open("my_resource.otf", "wb") as f:
    opentofu.serialize_resource(resource, f)
```

### Import Indirect Resources

Once indirect resources are taken care of, they must be imported into your OpenTofu project. There are a couple of ways to do this:

1. **Manual Import**

```
import opentofu

# Get the resource to import
resource_file = "my_resource.otf"

# Import the resource
opentofu.import_resource(resource_file)
```

2. **Automatic Import**

You can also import resources automatically using OpenTofu's scripting API. That is, you could write a script to import resources that meet certain criteria, such as a file name or resource type.

```
import opentofu

# Get the resources to import
resources = opentofu.get_resources_by_type("mesh")

# Import the resources
for resource in resources:
    opentofu.import_resource(resource)
```

1. **Import Blocks.**  
* OpenTofu's import block imports existing infrastructure resources into its state file to make it visible and manageable by OpenTofu.

```
import { to = aws_instance.example id = "i-12345678" }
resource "aws_instance" "example" {
  name = "my-ec2-instance"
  # ... other instance configuration
}
```

For example, the following import block references an existing EC2 instance (with instance ID i-12345678) and assigns it the logical name example, within the OpenTofu state. You can then manage that instance in subsequent configuration, using the logical reference example.

2. **Custom Providers.**  
* If you are using resources created by third-party providers, OpenTofu allows you to drive a custom resource provider and manage those resources in OpenTofu's state file. Custom providers handle the resource-specific interactions and incorporate them into OpenTofu's state. 

```
provider "custom_provider" "my_provider" {
  # ... configuration specific to the custom provider
}

resource "custom_resource" "indirect_resource" {
  provider = custom_provider.my_provider
  # ... attributes specific to the custom resource
}
```

This example showcases the creation of a custom provider, myprovider, to manage resources from an external service. The indirect resource is then created with this provider, giving OpenTofu the ability to manage this resource.

3. **Lifecycle Management with dependson**  
* The dependson meta-argument makes sure that resources are created or updated in the intended order. This is important for indirectly created resources because if the resources being managed in OpenTofu depend on resources in another external system, they need to be created first.

```
resource "aws_instance" "example" {
  name = "my-ec2-instance"
  # ... instance configuration

  depends_on = [aws_ebs_volume.data_volume]
}

resource "aws_ebs_volume" "data_volume" {
  # ... volume configuration
}
```

In this example, the EC2 instance being created depends on the data volume EBS volume. OpenTofu will ensure that the volume exists before launching the instance to avoid issues.

4. **State Reconciliation Tools**  
* OpenTofu can integrate with tools like Terraform Drift to understand infrastructure drift. These tools examine if the actual cloud state matches the OpenTofu state and review items that do not match.

You can then take advantage of tools like this to find indirectly created resources and decide if they should be imported into OpenTofu for trusted management.

5. **Version Control & Review**  
* Having version control for OpenTofu configurations and state files is essential. This can help with identifying how indirectly created resources are created and reviewed in the OpenTofu state.

A reliable version control system can help with collaboration and provide enough information so you can decide if you should take action against the indirectly created resources.

## Conclusion

Including indirectly created resources in OpenTofu will reduce the chances of your infrastructure going out of the desired state as a result of these unrelated resource changes.

There will likely always be some indirectly created resources that are not apparent. For example, consumption of cloud provider APIs to ensure you are aware of changes made, or using state reconciliation tools to review.

The best way to manage indirect resources will depend on several factors, about the resource type, provider integration, or known manual deployment. Therefore, be clear about the methods to reliably administer for your situation and utilize due diligence in establishing access control and security configurations in order to maintain a good security posture for your infrastructure.

Understanding the use cases and complexity of managing indirect resources will allow you to make good decisions on how the indirectly created OpenTofu resources are administered. This will allow you to maintain a more robust and consistent, highly managed (cloud) infrastructure by arranging everything as code with the support of OpenTofu infrastructure as code (IaC) features. Remember, it is important to always be aware of the best practices and keep adjusting your methodologies to suit your unique IaC environment.
