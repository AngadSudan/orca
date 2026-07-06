# @orca/resolver

The Orca Dependency Resolver works on the principal that 2 AWS Services might be dependent upon some another source inorder to create that resource.

The dependency-resolver first creates a dependency graph into to check the connection of resources

```json
{
  "ec2": ["security_groups", "key_pair"],
  "s3": [],
  "dyanamo_db": []
}
```

Once a graph is created we apply `topological sort` on the created graph to give the order in which the dependencies should be created

```json
["key_pair", "subnet", "ec2"]
```

> A default VPC will be created by default inorder to avoid the dependency of a public/private subnet. If any service might require a private subnet then based on the user input, the information can be populated.
