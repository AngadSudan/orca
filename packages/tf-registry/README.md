# @orca/tf-generator

Takes a JSON as an input and based on that creates a graph which helps with the resolution of dependencies.

The example JSON would be like as follows:-

```json
{
  "network": {
    "contains": {
      "private_subnet": {
        "contains": [
          {
            "dynamodb": {
              "contains": []
            }
          }
        ]
      },
      "subnet": {
        "contains": [
          {
            "ec2": {
              "contains": []
            }
          }
        ]
      }
    }
  }
}
```

The steps involved with the formation of the TF files would be as follow

- take the json and populate the data with what other than this is necessary for example ec2 requires security group and key_pairs
- then based on that there will be resolution of the configuration from the configuration engine
- with the configuration engine resolved, a final file will be created which will tell the order in which terraform blocks needs to be arranged
