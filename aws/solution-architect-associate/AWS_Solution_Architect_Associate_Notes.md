# AWS Solution Architect Associate

**Core Objective**
1. Cost
2. Performance	
3. Reliability
	* Test recovery procedures
	* Automatically recover from failures
	* Scale horizontally 
	* Stop guessing capacity
4. Security
	* Least privilege
	* Enable Tracability
	* Security in all layers
	* Automate
	* Protect data in transit and at rest	
5. Operational Excellence
	* IAAS
	* Annotate documentation
	* Make frequent, small, reversible changes

## Infrastructure
AWS Services are classified as Global / Region Scoped

### Region
The AWS Services is available in multiple regions across the world
 
### Availability Zones
Each region has many AZ's

## IAM  - Identity and Access Management Global Service

### User 
* People in an organization
### Group 
1. It contain users only
2. Group can contains user from multiple group
### Permissions 
* Access policy defines permission for user / Group on what to do, Its configured as JSON
* Ensure least privilige for user.
### Role
* The IAM Permission assigned to the AWS service for access other services

### MFA
1. Virtual MFA (Google Authenticator / Authy)
2. U2A (Universal 2nd Factor)
3. Hardware Key Fob MFA
4. AWS GovCloud

### Ways to access AWS Services
1. Console
2. CLI
3. SDK (us-east-1 is default region, when region not specified)
	
### IAM Security Tools - Audit
* Credential Report - Org level 
* Access Advisor - User level access info 

### IAM Best Practice
1. Assign user -> group -> permission
2. One physical user = AWS user
3. Never share your credentials

> Setup Admin account via root user and use it further.

### IAM Condition
* aws:SourceIP: Restrict the Client IP
* aws:RequestedRegion - Region level restriction
* ec2:ResourceTage/*
* aws:PrincipatTag/*
* aws:MultiFactorAuth
* S3 List Object permission (no /)
* S3 Object level permission (/*)

### IAM Permission Boundaries
* Supports for user, role not group
* Restrict the IAM Permission by setting up boundary policy
* Used in combo with SCP
* UC: User level restriction, Delegate permission for non admin users, Developers to self assign policies

### Policy Evaluation Step
1. Organization SCP
2. Resource Based Policy
3. IAM Permission Boundary
4. Session Policy
5. Identity Based Policy

> Eplicit **Deny** forces the Deny to resources

### STS Security Token Service
* Allow temporary access to AWS resources
* Token valid up to 1 hr must be refreshed
* AssumeRole
	* Within your own account for enhanced security
	* Cross Account Access: assume role in target account
* AssumeRoleWithSAML
	* Return credentials for logged user with SAML
* AssumeRoleWithWebIdentity
	* Returns user logged in with an IDP
	* AWS reccomends against using this, and Cognito instead
* GetSessionToken
	* For MFA from root user account

## Resource Access Manager
* Share AWS resources with your own or other AWS accounts
* Avoid resource duplication
* VPC Subnets
	* Allow to have all the resource launched in same subnets
	* Must be from same AWS Org
	* Cannot share SQ and default VPC
* AWS Transit Gateway
* Route 53 Resolver Rules
* Network is shared

## AWS Directory Service

**Microsoft AD**
* Database od objects: User, Accounts, Compute, Printers
* Centralized Security Management
* Objects are organized in trees

1. AWS Manage Ms AD 
	* Create your own AD in AWS and manage users
	* Establish trust with AWS and on-prem
2. AD Connector
	* Proxy to redirect to on-prem AD
	* User managed in  on-prem AD
3. Simple AD
	* Standalone managed directory powered by Linux-Samba AD compatible servers
	* Cannot be linked to on-prem AD

## AWS SSO
* Centrally managed SSO for multiple accounts
* Integrated with AWS Organizations
* Support SAML 2.0
* Integate with on-prem AD
* Centralized Permission Mgmt
* Centralized CloudTrial

## Organizations
* Global Service to manage multiple accounts
* Main account is master account others are member account
* Member account are part of 1 org only, it can be migrated
* Consolidated billing and discounts for all accounts

#### Strategies 
* Create account per Dept / Env / other
* Seprate VPC
* Multi Account vs One Account Multi VPC
* Tagging for Billing
* Enable CloudTrial for all accounts
* Send cloud watch logs to central logging

#### Organization Units
* BU
* Environmenttal Lifecycle
* Project Based

#### Service Control Policies
* Whitelist or blaclist IAM Action at OU or Account Level
* SCP applied to all User & Roles of Account including root
* Similar to IAM Policy
* Unit level access restriction. 
* Organization linked in tree structure
* Default - FullAWSAccess policy

#### Backup Policies
* Policies for Backup

#### Tag Policies
* Standardize all tagged resources

#### Migration
* Remove member account from Org 
* Send invite to new org, then link to it
* For an master account, release all member acc
* then, delete org and then send invite

## EC2 - Elastic Compute Cloud

### Security Group
* Acts an firewall
* Regulate Ports
* Authorized IP Ranges
* Control or Inbound & Outbound
* Can be attached to Multiple Instances
* All inbound is blocked
* All outbound is authorized.

> Any timeout issue is related to Security Group Issue

**Important Ports**
Port | Protocol |
-----| -------- |
22 | SSH 
21 | FTP
22 | SFTP
80 | HTTP
443 | HTTPS
3389 | RDP ( Specific for Windows)

### EC2 Purchase Options
1. On-Demand - Short Time (Unpredictable Time)
	* Linux - Pay per second
	* Window - Pay per hour
2. Reserved Instances ( Huge Cost Saving by Discount)
	* Reserved Instances (Reserve the instance for 1 or 3 years by choosing instance type)
	* Convertible Reserved Instances - (Can change Ec2 instance type, less discount) 
	* Scheduled Reserved Instances - (Reserve by Timing)
3. Spot Instances
	* 90% Discount - Most cost efficient
	* Instance can loose at any point
	* Useful for workload that are resilent to failure
		* Batch Jobs
		* Image Processing
4. Dedicated Hosts (Entire Physical Server)
	* Address Compilance requirements / regulatory
	* Bring your own license
	* 3 year reservation
5. EC2 Dedicated Instance
	* Hardware dedicated to you.
	* May share hardware within the same account

**IPv4**
1. Public Ip - Can be access across everywhere and its unique
2. Private Ip - Can be access inside a private network. In order to access the internet, Internet Gateway is required.
3. Elastic Ip - Reserved Public IP for an resource, the will not change when the resource is start / stop

> EC2 Instance come with both private and public ip

### EC2 Instance Metadata
* It allows EC2 instance to learn about themselves
* [URL](http://169.254.169.254/latest/meta-data)
* Using this URL IAM Role name 	can be retreived.
* Metadata share the info about EC2

### Spot Instance 
* Create or Stop instance based on the bidding
* Termination: Instance should be in **active, open & disable.**
* Cancel Spot Request -> Terminate Instance
### Spot Fleets
A set of spot instances + On Demand (optional), Meet target capacity with price constaints.
* Possible Launch Pools
* Can have multiple launch pools, so that fleet can choose
* Stops launch when it reaches max cost or capacity

**Strategy to Allocate Spot Fleet**
* lowestPrice - Cost Optimization - Short Workload
* divirsifed - Avaliablity & long Workload
* capacityOptimized - Pool with optimal capacity for no of instances.
> Spot fleet allow us to automatically reqest spot instances with low cost.

### EC2 Placement Group - EC2 Hardware Placement
Type of Placement Group
1. Cluster - Placement group with low latency network, all instances in same rack, AZ
	* Great Network
	* If rack fails all instance fails
	* UC: Big Data Job & App with low latency and high n/w throughput.
2. Spread - All EC2 instances in diff hardware and mutliple AZ
	* Reduce Risk
	* Limited to 7 instance per AZ per placement group
	* UC: High Availability Application
3. Partition - Instances are partitioned within the AZ and region
	* 7 Partitions pers AZ
	* Span across multiple AZ in same region
	* Up to 100 EC2s
	* Same instance rack is not shared with partitions
	* EC2 get access to partition info as metadata
	* UC: HBase, Cassandra, Kafka

**EC2 Hibernate - Persist the RAM state by storing it in EBS**
* Supported Instances C/M/R (3-5)
* RAM Size must be < 50GB
* Not supported for Bare Metal
* Root Volume must be EBS, encrypted
* Avl on On-Demand & Reserved Instances
* Hiberate cannot be more than 60 days.

#### Instance Types
1. General Purpose
	* Arm Processor (a)
	* Burstable Tiny or Turbo (t-family)
	* Good for  consistent workload ( m-family)
2. Compute Optimized
	* Compute (c-family)
3. Memory Optimized
	* Good for in-memory database (r/x1/z1d-Family - RAM/xtreme/zippy) 
4. Accelerated Computing
	* Graphic Processing and other GPU (p/inf/g/f1 - picture/infer)
5. Storage Optimized 
	* SDD Backed	
	* HDD Backed
	* Highest Disk Ratio

#### EC2 Nitro
* Avanced Virtualization Technology
* Higher EBS IOPS Speed (64K IOPS Nitro, 32k IOPS NonNitro)

#### vCPU
* A core is a CPU, core can contains multiple threads (Multithreading)
* Core * Thread (1 Core * 2 Thread = 2vCPU)
* Reduce cores for CPU Optimization
* For HPC have one threads per core. Disable multi threading.

## ENI - Elastic Network Interface

A logical componenet in VPC which represents the network card
ENI Attributes

* Primary Private IPv4 and secondary
* 1 Public IPv4
* One or more SG
* A MAc address

> ENI Shall be created independently and attached to EC2
Bound to AZ

## EBS - Elastic Block Store
* Network Drive to store data via network
* Available with in AZ
* Have a provisioned capacity, can increase capacity
* More than 1 EBS shall be attached to EC2 instances
* EC2 Termination may delete the volume based on configuration
### EBS Snapshot
* Backup of EBS volume
* EBS Detach is not necessary for snapshot, but recomended
* Can tranfered within AZ or Region
#### EBS Volume Types
* General Purpose SSD (gp2/gp3) - Low latency interactive apps ( Dev/ Test env)
	* 1 GB - 16 TB
	* gp3 - Baseline 3000 IOPS & Throughput 125 MB. IOPS can increase upto 16k & Throughput 1000 MiB
	* gp2 - Small volumes can burst 3k IOPS, max 16k IOPS. 3IOPS per GiB
* Provisioned IOPS (io1/io2) - High Performance Workload require millisecond latency
	* io1 - Max PIOPS: 64K - Nitro EC2; 32k for EC2 - Durable and more PIOPS per GB	
	* io2 Block Express (4-64 TiB) - Sub Milli second latency - Max PIOPS 256K IOPS with 1000 IOPS per GiB ratio
	* Support EBS Multi Attach
* st1(HDD) - Low cost HDD volume designed for throughput intensive work load
	* Big Data Warehousing		
* sc1(HDD) - Low cost designed for less frequent access work load
	* Archival - Cold Storage.

> Only gp2/3 - io1/2 shall be used as boot volume.

> Multi Attach Supported only in (io1 & io2)

**EBS Multi Attach**
* Same EBS shall be used by multiple EC2 instances in same AZ
* UC: High application availability; Concurret application processing
* Must use File system thats cluster aware.

**EBS Encryption**
* Data at rest is encrypted
* Data in flight moving between instance is encrypted
* All snapsots are encrypted & volumes
* Encryption has minimal impact on latency
* EBS Encryption leverages keys from KMS (AES-256)
	
**EBS Characteristics**

* IOPS - Number of read / write per second
* Throughput - Rate of data transfer per second.
* Size

## AMI - Amazon Machine Image
AMI are customization of an EC2 Instance. Create your own AMI and reuse it for future usecase. AWS Market place - Community / Seller

### Process
* Start EC2 -> Customize -> Stop -> Build AMI -> Use it across regions

### EC2 Instance Store 
Hardware disc attached to EC2. Special type of EC2 support Instance store.
* High Performance
* Ephemreal Storage 
* Good for buffer / cache / temporary data
* Risk of data loss if hardware fails
	
### EBS RAID - Redudant Array of Independent Disks
* OS Level Configuration
#### RAID 0 (Stripping)
* Increased Performance but not fault tolerant
* Mutlipe EBS as logical volume, if one volume fails all the data is lost
* Huge Disc with high IOPS
* Used for data replication or an app needs high IOPS
#### RAID 1 ( Mirroring - Increased Fault Tolerance)
* Multiple EBS attached to EC2 and data is mirrored to both
* Send data to 2 EBS is 2x network utilization

## EFS Elastic File System
* Network file system shall be mounted to many EC2's, available across region.
* US: CMS, Data Sharing, Web Serving
* LINUX based AMI Only
* Use SG to controll access
* POSIX File System

**Performance**
* 1K Concurrent NFS Clients, 10 GB+ /s throughput
* Grow to Pentabyte scale n/w File system
* GP Mode- latency sensitive use cases (CMS)
* MAX I/O Mode - High latency throughput, parallel processing - Big data / Media Processing
* Provision your throughput regardless of size
* Tiers - Standard / Infrequent Access (Cost for retrieval)

### ELB Elastic Load Balancer
The server that forward the request from internet to multiple EC2 instances
* Spread load across multiple downstream instances
* Single Point of access (DNS) to application
* Do requalr health checks
* Handle failure
* SSL Termination to your websites
* Enforce stickiness with cookie 
* High Availability across zones
* Seperate public traffic from privte traffic
* AWS Managed LB 
#### Health Check
* Ensure EC2 is healthy

**Types**
1. Class Load Balance (v1) ( HTTP, HTTPS, TCP)
	* Multiple instances shall be mapped and load balanced
	* No other advananced routing options
2. Application Load Balance (v2) ( HTTP, HTTPS,Websocket)
	* Layer7 Load Balancer
	* Load Balancing to multiple HTTP applications across machines (target group) / same machines
	* Support HTTPS/2 & Websocket
	* Supports redirection
	* Support routing tables to diff target group
		* path
		* query string
		* host name
	* Target Group	
		* EC2 Instance managed by Auto Scaling
		* ECS Tasks
		* Lamba Function
		* Private IP Address 
		* ALB Can route multiple target route
		* Health check at TG level
	* UC: Micro services / ECS
	* Port mapping feature to redirect to dynamic port ECS	
> Application servers dont have access to client ip. the ip is found in X-Forwarded-(For/Port/Proto) headers. 
	
3. Network Load Balancer (TCP, TLS & UDP)
	* Forward TCP & UDP Traffic
	* Less Latency 100ms that ALB - 400ms
	* 1 Static IP Per NLB
	* Used for extreme performance Application
	* Handles Millions of request per second
> You can setup private ELB or public ELB

**Troubleshooting**
* LB can scale but not instantaneously - contact AWS for warm-up`
* 4XX Client Induced error
* 5XX Application induced error
* LB 503 means at capacity or no registered target
**Monitoring**
* ELB Access log to trace all request
* Cloudwatch metric to get LB stastics

[Gateway Load Balancer](https://aws.amazon.com/blogs/aws/introducing-aws-gateway-load-balancer-easy-deployment-scalability-and-high-availability-for-partner-appliances/)

#### Load Balancer Stickiness
1. Same request for same client to same instance	
2. UC: Cookie session data
3. Load might be shared unevenly

### Cross Zone Loadbalancing
* Each load balancer equally distibutes the load evenly to all instance in the region irrespective of instance number per AZ.
* Enabled by default in ALB & CLB
* Enable manually for NLB

### SSL 
* Load balancer uses X.509 Certificate (SSL/TLS)
* AWS Certificate Manager - ACM
* You can upload your own certificate alternatively

**HTTPS Listener**
* Specify a default certificate
* Client can use SNI to specify the hostname they reaches
* Ability to specify security policy for older version of TLS/SSL

**Server Name Indication**
* Load multiple certificate into a web server
* Server ill load the certificate by hostname given by client
* Supported in ALB, Cloudfront & NLB (Supports multiple listeners with multiple SSL Cert). 
#### Connection Draining / Deregistering
* Time to complete inflight request when instance is deregisterin gor unhealthy
* Stop sending request to de-registeing instance
* Time 1-3600secs. Default = 300; Disable - 0

### Auto Scaling Group
* Scale In
* Scale Out
* Config: Min / Max Size & Initial Capacity
* Manage Scaling by Alarm
* Rule / Scaling Policy
* Replace the instance when terminated / unhealthy
* IAM Role attached ill be assigned to EC2

**Auto Scaling Rules**
Now its better to manage the rules in ECS
* Average CPU Usage
* No of req per ELB
* Average N/W in/out
#### Scaling Policies
* Target Tracking ( Maintain CPU at 40%)
* Simple Step Scaling ( Add/ remove unit based on Cloud Watch alarm)
* Scheduled Actions (Anticipate scaling based on usage pattern)

**Scaling Cooldown**
* Ensure your ASG doesnt perform any action within a specified period of previous ASG action

**ASG Termination Policy**
* Find AZ which has more instances
* If multiple instances are running in AZ, it choose one with oldest launch configuration
* ASG Tires to balance no of instances within the AZ

** Lifecycle Hook**
To perform some operation while creation/ termination of instance.
* Pending -> (Wait / Proceed)
* Termination -> (Wait / Proceed)

## AWS RDS - Relational Database Service
The manage database service by AWS, 
* Automated Provisioning, OS Patching
* Continious Backup and restore
* Monitoring Dashboard
* Read Replica 
* Multi AZ Setup for DR
* Scaling (Hz / Vert), Sorage backed by gp2 / io1

The database supported by RDS are,
1. Postgres
2. MySQL
3. MariaDB
4. Oracle
5. Microsoft SQL Server
6. Aurora (AWS Proprietary Database)

**Backups**
* Automaticaly enabled in RDS, default retention period is 7 days ( max 35 days)
* Transaction logs are backed-up every 5 minutes
**Snapshot** 
* Manual trigger by User
* Retention period is as long you want
**Storage Auto Scaling**
* Scale the storage au
* Set Max Storage Threshold for scaling
* Support all DB engine
**Read Replica - Multi AZ**
* Up to 5 Read Replica
* Within AZ, Cross AZ / Region
* Replication is async, eventually consistent
* Application must update connection string to leverage read replicas
* UC: Reporting Application
* Read Replica is only for Read (SELECT)
* For DR, it can be setup as Multi AZ
**Read Replica Network Cost**
* Free replication across AZ
* Replication Fee for, data transfer across region
**RDS Multi AZ**
* SYNC Replication
* DNS Name - Automatic app failover standby
* Incase of failure standby will be promoted as master
* Single - Multi AZ - Zero Downtime
**Security - Encryption**
Encryption at rest
* Possible to encrypt master and read replica with AWS KMS - AWS256
* Encryption has to be defined at launch time
* If master is not enc, read replica cant be encrypted
* Transparent Data Encryption av/ for Oracle & SQL Server
**In flight Encryption**
* SSL Cert to encrypt RDS inflight
**Encryption Operation**
* Encrpted DB create enc snapshot
* Non Encrpted DB create non enc snapshot
* Can conver a copy of snapshot to encrypted one. (Use in migration)
**N/W - IAM**
* Usually Private Subnet, Not in public one
* Leverage using security group
* IAM helps manage RDS access
> RDS IAM supported only in MySQL & Postgress
### Aurora
* Proprietary Technoloy of AWS. Supported for MYSQL & Postgres
* AWS Cloud optimized and claims 5x perf over MySQL & 3x perf over postgres
* Storage automatically increment from 10GB to 64TB
* Can have 15 replicas while MySQL has 5, and the replication is faster
* High Available 
	* 6 copies of data across 3 AZ
	* 4 copies out of 6 for writes
	* 3 copies out of 6 for reads
	* Self healing peer to peer replication
	* Storage is striped across 100s volumes
	* One Aroroa Instance takes writes - master
	* Failover master is 30s
	* Master + 15 Aurora Read Replica serve reads
	* Support for Cross Region Replication
**DB Cluster**
* Writer Endpoint - Write
* Reader Endpoint - Read (1 to 15 Replicas based on Auto Scaling config)
* Shared Storage Volume
* Backtrack - Restore to the data back to any time without backup mechanism
**Aurora Custom Endpoint**
* Define a subset of arora instances as a custom endpoint
* Run analytical queries on specific replicas
* Reader endpoint is not used after defining custom endpoint
**Serverless**
* Automated database initialization, auto scaling on usage
* UC: Infrequent and unpredicable workload
* Pay per second can be more cost effective
**Multi Master***
* Immediate failover for write node (HA)
* Every node does R/W
**Global Aurora**
* Cross Region Read Replica - Useful for Disaster recovery
* Global Database
	* 1 Primary region
	* Up to 5 regions - 16 read replicas per secondary region
> Arora ML | SageMaker | Comprehend	
## Elastic Cache
* Managed Redis or Memcached
* REDIS
	* Multi AZ with failover
	* Read Replica for HA
	* Data Durability using AOF persistence
	* Backup & Restore
	* Redis AUTH - Exta security
	* SSL
* MEMCACHED
	* Multi-Node Partitioning data (Sharding)
	* No HA - Replication
	* No backup/resotre
	* Multi-threaded architecture
	* Support SAS Based Authentication
Patterns for Elasticache
	* Lazy Loading - Read data is cached, data become stale
	* Write Through - Update the cache
	* Session Store - TTL for data
## Route 53 - Managed DNS | Global Service
* Managed DNS
* Domain Registrar
**Common Records**
* A - Hostname to IPv4
* AAAA - Hostname to IPv6
* CNAME - Hostname to Hostname
	* Its supported only in non root domain any hostname shall be mapped
* Alias - Hostname to AWS Resource
	* Specific to AWS Resource, shall point root / sub domain.
	* Free of charge
	* Native Health check
* Resolve Public or Private Domain
* Load Balancing through DNS
* Health checks
* Routing Policy
#### Routing Policy
1. Simple
	* Bind Multipe IP to single A Record
2. Weighted Routing Policy
	* Control the % of the requests that go to specific endpoint
	* Helpful to test 1% of traffic on new app version 
	* Split traffic between region
	* Can be associated with Health Checks
3. Latency
	* Redirects the user to least latency close to us
	* Latency is evaluated interms of designated AWS region
4. Failover 
	* Configure Healthcheks
	* Type -> Primary and Secondary
	* When primary is unhealthy its routed to secondary
5. Geo Location Routing Policy
	* Routing based on user location
	* Should create default policy when no location match
6. GeoProximity Routing
	* Shift traffic withing the region by bias, when the bias is higher more users are attracted
	* Avl in Traffic Flow
7. Multi Value
	* Routing traffic to multiple resources 
	* Support health check, non healthy resources are excluded
#### Health Checks
* Healthy - x health checks failed (x - 3)
* UnHealthy  - x health checks failed (x - 3)
* Default HC interval 30s
* About 15 health checker check the endpoint health
* Supported Protocal (HTTP/HTTPS/TCP)
## Beanstalk
* Instance Configuration / OS and pre installed applications are managed
* Deployment stratergy is configurable
* 3 Architecture Model
	1. Single Instance
	2. LB + ASG ( High Availability)
	3. ASG (Non Web App)
> Golden AMI: Standard for creating application snapshot with preconfigrued setup

## S3
* Indefinite Scaling & Storage
* Region based service
* Store objects in bucket(directory)
* Naming Convention
	* No Uppercase / Underscore
	* 3-63 Char long
	* Not an IP
	* lowercase or number 

### Object

* Object is a file of any type
* Object max size is 5TB - more than 5GB do multi part upload
* Globally unique name - region level
* Metadata (System / User)
* Tags - Useful for security lifecycle
* Version ID

### Versioning
* Version file uploaded in S3
* Enable versioning while create bucket
* Version Id is assigned to every objects, the object with same key uploaded then latest version id shall be tagged
* Version Id is null when versioning is not enable while creation of bucket
* Delete marker will be added while performing deletion for versioned bucket
* Rollback supported
### Encryption
1. SSE-S3
	* Server Side Encryption managed by AWS S3 Managed data key
	* Encrypt the object - AES-256
	* Encryption Header x-amz-server-side-encryption:AES256
2. SSE-KMS
	* Server Side Encryption managed by KMS	
	* Adv: User Control + Audit Trial
	* Encryption Header x-amz-server-side-aws:kms
	* KMS add additional layer of API call to GenerateDataKey for Encrypt/Decrypt.
	* KMS Quota per second (5500, 10000, 30,000 based on region)
	* KMS Quota may limit the S3 performance and throttle it.	
3. SSE-C
	* Server Side Encryption fully managed by customer data key
	* AWS does not store the encryption key
	* Data key needs to be passed in header with object so that S3 will encrypt and store 
	* To access the object same data key needs to be passed in HTTP header
	* Client needs to manage the keys
4. Client Side Encryption
	* Encrypt the object in client side with data key using AWS S3 encryption library
	* Decryption also happen in client side only
	* S3 Bucket just store the encrypted object
	* Customer manages the encryption and keys fully

**Encryption in Transit (SSL/TLS)**
* S3 Support HTTP & HTTPS
* HTTPS is mandatory for SSE-C
* SSL/TLS is also called Encryption in flight

**Security**
* User Based - IAM Policy
* Resource Based
	* Bucket Policy - Bucket rules - Cross account access
	* Object ACL
	* Bucket ACL
* Netwoking
	* Support VPC Endpoint
* Logging & Audit
	* S3 Access logs can be stored in another bucket
		* Create seperate logging bucket to store access logs
		* Do not use logging bucket to monitored bucket (same bucket) - it will create a infinite loop
	* API Calls can be logged in Cloud Trial
* User Security
	* MFA Delete
	* Pre-Signed URL - Valid for limited Time
* Block Public Access
	* new ACL
	* any ACL
	* new Public bucket or access point policy
* Block public and cross account acces to buckets and objects through any public bucket or access point policies

**Consistent Model**
* Strong Consistent
	* After suscessfull PUT/Delete, Its reflected in List Bucket

**MFA - Delete**
* Forces user to enter MFA code before performing crucial operation in S3
* Permanently delete an object version
* suspending versioning on bucker
* Only bucket owner - root account can enable/ disable MFA
* Its supported only via CLI

**Replication**
* Must enble versioning in source and destination bucket
* CRR - Cross Region Replication
	* Compliance - Lower Latency access
* SRR - Same Region Replication
	* Log Aggregation, live replication btw prod to test
* Buckets can be diff accounts
* Copy is asynchronous
* After activating only new objects are replicated
* For Delete - No replication
* No chaining of replication B1 -> B2 -> B3 (B1 data not replicated to B3)

**Pre Signed URL**
* It can be generated via SDK / CLI
* Default validity 3600s, can change with --expires-in argument
* User given a pre-signed url inherits the permission of user who create for GET/PUT
* Issue a request as the person who pre-signs the URL

**Storage Classes**

* S3 Standard - General Purpose
	* Highly Durable
	* 99.99% Availability over a given year
* S3 Standard Infrequent Access (IA) 
	* Multi AZ
	* Suitable for less frequent access but requires rapid access when needed
	* 99.9% Availabilit
	* Low cost compared to S3 GP
	* UC - Backup Datastore
* S3 One Zone-Infrequent Access
	* Same as S3 IA but singe AZ
	* High Durability but data lost when AZ destroyed
	* UC: Secondary backup, storing data you can recreate
* S3 Intelligent Transfer
	* Automaticaly moves object btwn 2 access tier based on access pattern
	* Resilient against events that impact entire AZ	
* Amazon Glacier
	* Low cost object storage - Archive / Backup
	* Data is retained for longer term (10s of years)
	* Alt to on-prmise magnetic tape
	* Low cose
	* Each item in Glacier is Archive (up to 40TB)
	* Archives are stored in vault
	* Retrieval
		* Expedited (1-5 minuts)
		* standard (3-5 hours)
		* Bulk (5-12 hours)
		* Min storage duration 90 days		
* Amazon Glacier Deep Archive
	* Storage for longer term
	* Retrieval
		* Standard (12 hours)
		* Bulk (48 hours)
		* Min storage duration 180 days

> Minimum Storage duaration charge for 30 days - S3 Intelligent / IA / One Zone-IA
> Transition allowed between storage classes by configuring lifecycle policy

**Lifecycle Policy**
* Transition Action - Transition with diff storage classes based on the policy (date)
* Expiration Action - Deleting object after configured threshold
* Rules can be created for certain path prefix
* Rules can be created for certain objects tags
**S3 Analytics**
* Storage analytics to determine when to transition objects from standart to IA.
* Not supported in 1_ZONE / Glacier

**Performance**
* Auto scaling to high request rates, latency 100-200 ms
* No limit on file path prefix
* 5,500 GET/HEAD per prefix, 3500 PUT/POST/DELETE per prefix
* Multipart Upload - recommended for file > 100 MB, must for file > 5GB
* Byte Range Fetch
	* Parallelize GET by requesting specific byte range.
	* Better resilience in case of failures.
	* Can used to retrieve only partial data, byte by byte.

**S3 Transfer Accleration**
* Increase Transfer speed of the file by using nearby edge location and it will forward the data to target location.
* Compatible with multi-part upload.
**S3/Glacier Select **
* Server side filtering on S3 data using SQL
* Querying on single object which is in csv / json format
* Can filter row and column
* Less n/w transfer and low cpu cost.

**Event Notification**
* Notify by S3 action
* Filtering object (*.jpg)
* UC: Generate Thumbnail
* Target
	1. Lambda
	2. SNS
	3. SQS

**Requester Pay**
* The requestor will pay for the usage rather than bucket owner.
* Bucket owner is charged for storage
* Requestor must be an AWS user

**Glacier Vault Lock**
* Adopt WORM ( Write Once Read Many) model
* Lock the policy for future edits
* UC: Helpful for compilance / future edits

**S3 Object Lock**
* Adopt WORM ( Write Once Read Many) model
* Block an object version deletion for a specified amount of time
* Object Retention
	* Retention Period - Specify a fixed period
	* Legal Hold: Same Protection, No expiry
* Modes
	* Governance Mode - User cant override or delete unless they have special permission'
	* Compilance Mode - Even root user cant delete and retention mode cant be changed

## CloudFront
* Is a CDN 
* Improved read performance, Content is cached at edge
* 216 Edge location
* DDoS Potection with Shield
* Application Firewall

### Origin
* S3 Bucket
	* For distributing and caching them at edge location
	* Enhanced Security with CloudFront Origin Access Identity (OAI)
	* CloudFront can be used as ingress to upload files to S3
* Custom Origin 
	* ALB
	* EC2 Instance
	* S3 Website
	* Any HTTP Backend
### Geo Restiction
* Whitelist - Allow users from specific country
* Blacklist - Block user for specific country
* Use Case: Copyright Law to control access to content
### Pre-Signed URL / Cookie
* Signed URL - Access to individual file
	* Allow access to path no matter origin is
	*  Caching
	* Filter by IP, Path, Date & Expiration
* Signed Cookie - Access to multiple files
 
### Pricing
The pricing of cloudfront access and data tranfer varies for location
1. Price Class All - All region
2. Price Class 200 -  Excludes most costly region
3. Price Class 100 - Only the least expensive region

### Multi Origin
* To route different kind of origin based on path

### Origin Group
* To increase failer over and increase the availability
* Group -> 1 Primary and 1 Secondary
* If primary fails, secondary is used

### Field Level Encryption
* Protects user sensitive information, encrypted at edge location.
* The PII fields shall be encrypted with private key on top of SSL, decrypted in app layer. (Credit Card Value)

## Global Acclerator

* Leverage AWS internal network to route your application
* 2 Anycast IP are created for your application
* The Anycast IP send traffic directly to Edge Locations
* Works with Elastic Ip, ALB, NLB, public or private
* Health check
* DDoS Protection
* Proxying packets at the edge to application running in one region
* UC: UDP, IoT or Voice IP & HTTP usecase requires static IP 

**General**
* UniCast - One IP for 1 Server
* AnyCast - One IP for multiple server, automatically picks the nearest location

## AWS SNOW Family
* Highly secure and portable devices to collect and process data at the edge and data migration
* Offline devices to perform data migration
  
> If data transfer takes more than a week, use snowball devices

### SnowballEdge
* Physical data transfer to move TBs or PBs of data in or out of AWS
*Alt to moving data over n/w
* Snowball Edge Storage Optimized
	* 80 TB of HDD Capacity volume for S3 compatible object storage
* Snowball Edge Compute Optimized
	* 42 TB of HDD Capacity volume for S3 compatible object storage
* Migration size till petabytes
* UC: Large data cloud migratuons, DC Decommision & Disaster recovery

### Snow Cone
* Small, portable computing, anywhere & secure
* Device used for edge computing storage and data transfer
* 8 TBs of usable storage
* Sepetate battery and cables
* Can be sent back to AWS Offline or connect it to internet for AWS DataSync
* Migration size till 24 GB
### Snow Mobile
* Transfer exabytes of data
* Each Snowmobile has 100PB of capacity
* High security, temp controlled, GPS, 24/7 survillance
* Migration size - upto exabytes

**Edge Computing**  
* Process data while its being created on an edge location, these location may or may not have access to internet
 * Snowball Edge / Snowcode devices to do edge computing
* UC: Preprocess data, Machine learning & Transcoding media streams
1. Snowcone 
	* 2 CPUs, 4GB RAM 
	* USB-C Power 
2. Snowball Edge- Compute Optimized
	* 52 vCPU, 208 GiB of RAM
	* Optiona GPU ( Video processing / machine learning)
3. Snowball Edge- Storage Optimized
	* Upto 40 vCPUs, 80 GIB of RAM
	* All: Can run EC2 instances & AWS LAmbda using IoT Greengrass

**AWS OpsHub**

* Software to manage SNOW Family
* Single or clustered file transfer
* Managing EC2 instance
* Launch compatile AWS Services ( DataSync, NFS & EC2)

## AWS Cloud Storage
1. Block
	* EBS
	* EC2 Instance store
2. File
	* EFS
	* Amazon FSx
3. Object
	* Amazon S3
	* Amazon Glacier
4. Storage Gateway
	* Bridge between on-prem and cloud data in s3
	* UC: DR, Backup & restore, tiered storage

## Storage Gateway
Integrate on-prem storage with cloud		 
1. File Gateway
	* Conifure S3 buckets are accesible using NFS & SMB [Server Message Block] protocol
	* Supported in S3 Standard / IA/ 1 Zone IA
	* Access using IAM for each file Gateway
	* Caching
	* Can be mounted to many servers
	* AD Integration
2. Volume Gateway
	* Block Storage using iSCSI potocol backed by S3
	* Backed by EBS Snapshots which can help restore on-premise volume
	* Cached Volume: Low latency access to most recent data
	* Stored volumes: entire dataset is scheduled backup to s3
3. Tape Gateway
	* Some companies have backup process using physical tapes
	* Virtual Tape Library backed by S3 & Glacier
4. Storage Gateway - Hardware Appliance
	* Hard ware applicance works with File/Volume/Tape Gateway
	* Had the required CPU, Memory, n/w, SSD cache
	* UC: Daily NFS Backup in small datacenter

### Amazon FSx 
#### Windows
* FSx is fully managed Window file system share drive
* Support SMB protocol & Window NTFS
* Microsoft AD integration, ACLs, user quotas
* Accesed from on-prem, multi AZ
* Data is backed up in S3

#### Lustre (LINUX + Cluster)
* Luster is a type of paralled distributed file system for large scale computing.
* Machine Learning, HPC, Video processing, Financial modeling, Electronic design automation
* Scales up to 100s GB/s, millions of IOPS
* Seamless integration with S3
* Can be used from on-prem servers

#### File System Deployment Options
* Scratch File System
	* Temp Storage
	* Data is not replicated
	* High brust
	* Short term processing, optimize
* Persistent File System
	* Long term storage
	* Data is replicated within same AZ
	* Replace failed files within minutes
	* UC: Long term processing, sensitive data
## AWS Transfer Family
* A fully managed service for file transter for S3/EFS using FTP
* Supported Protocol - FTP, SFTP & FTPS
* Multi-AZ pay per provisioned endpoint per hour + Data transfer
* Integrate with existing auth system (Microsoft AD, LDAP, Okta, Amazon Cognito & Custom)
* UC: Sharing files, public dataset, CRM, ERP

## SQS - Simple Queuing Service
### Standard Queue
* Producer & Consumer
* Fully managed used to decouple application
* Can have duplicate messages
* Out of order messages
* Poll up to 10 messages at a time
#### Attributes
* Unlimited throughput, unlimited no of messages
* Default retention of messages 4 days, max of 14 days
* Low latency ( <10 ms ob publish and receive
* Limitation of 256KB per message sent
#### Security
* Encryption HTTPS 
* Client side encryption
* At-rest encryption using KMS Keys
* Access controls: IAM policies 
* SQS Access Policy
#### SQS Access Policy
* Cross Account access
* Multiple Producer (SNS / S3) SendMessage
#### Message Visibility Timeout
* After a message is received by consumer, its invisible for others
* When the message is not proceed by consumer, it will be available for other consumer after exceeding visibiity timeout
* ChangeMesageVisibility API to get more time for processing this message
* High Visibility timeout to avoid duplicates
* 0 - 12 hours
#### Dead Letter Queue
* Maximum Receive Threshold ( 1 - 1000)
* During failure loop when the Maximum Receive Threshold is reached it can be sent to Dead latter queue
* For DLQ - Its advisable to have long duration for message retention
#### Request-Response System
* To implement Request-Response pattern use SQS Temporary Queue Client
* It leverages virtual queue instead of creating/ managing queues
#### Delay Queue
* Delay message for consumer
* Default 0 - 15 min - 0 No Dealy
* Default at queue level can be overriden by mesage level by setting DelaySecond parameter

### FIFO Queues
* Ordering of message - Message Grouping ID
* Limited Throughput - 300msg/s without batching, 3000msg/s with batching
* Exactly-once send capability (Remove Duplicates)
* Name should end with fifo
* Content based Deduplication to remove the duplicaes sent be producer - DeduplicaionId

## SNS - Simple Notification Service
* Send message to multiple receiver
* Pub / Sub
* Upto 10 mn subscribers per topic
* Subscriber
	* HTTP
	* SQS
	* Lambda
* Topic Publish
* Direct Publish
	* Create platform app
	* Create platform endpoint
	* Publish to platform endpoint
	* Works with GCM, APNS, Amazon ADM
#### Security
* Encryption HTTPS 
* Client side encryption
* At-rest encryption using KMS Keys
* Access controls: IAM policies 
* SNS Access Policy

#### SNS - FIFO Topic
* Similar to FIFO SQS (Message Group Id & Deduplication Id)
* Limited Throughput same as FIFO

#### Message Filtering 
* JSON Policy used to filter messages
* If subscription doesnt have filter policy, it receives every message

> SNS / SQS Fan Out Pattern - Send single event to multiple topic
> SQS SNS are coud native services and they are proprietary protocols of AWS

## Kinesis
* Collect, Process & Analyze data stream in real time 
* UC: Ingest realtime data, App logs, website clickstrea, IOT Telemetry data

### Kinesis Data Stream
* Data is stored in shards,can have N no of shards
* Retention 1-365 days
* Ability to reprocess data
* Data is immutable cant be deleted
* Streaming service for ingest at scale
* Write 1MiB/s or 1000 Data records/s per shards
* EVery shard as Partition key
* Ordering at shard level
* Source : AWS SDK, IOT, Kinesis Agent
* Target : AWS SDK, Lambda, Kinesis Data Firehouse, Data Analytics
### Kinesis Data Firehouse
* Full Managed, Supports custom data transformation using AWS Lambda
* Transform : Lambda
* Source : AWS IOT, CloudWatch, Data Streams
* Target - Batch Writes
	* AWS: S3 / Elasticsearch / Redshift through S3 Copy Command
	* 3rd party: Splunk/ MongoDB/ DataDog
	* Custom: HTTP Endpoint
* Can send failed or all data to S3 bucket

### Kinesis Data Analytics
* Realtime analytics using SQL
* Source: Kinesis Data Stream / Firehouse
* Destination: Kinesis Data Stream / Firehouse
* UC: Time-series analytics / Real-Time dashboard / metrics

## Amazon MQ
* Message broker service for ActiveMQ & RabbitMQ
* Managed Service
* Supports open protocols such as MQTT, AMQP, STOMP
* To migrate on-prem open protocols to cloud
* Runs on dedicated machine, can run in H/A ( Active - Standby)
* MQ has both queue feature and topic feature

## ECS Elastic Container Service
* Launch docker container on AWS
* Provision and maintain infrastructure (EC2 instance)
* AWS take care of start/stop of containers

### EC2 Launch Type for ECS
* Create EC2 instance 
* Use AMI which has ECS Agent
* Run ECS Task

### Fargate
* Launch Docker container on AWS
* No EC2 provisioning
* Serverless
* Configure CPU / RAM, AWS will manage it 
* Each Fargate task has seperate ENI within VPC

### IAM Roles for ECS
* EC2 Instance Profile
	* Used by ECS Agent (ECR, ECS, Cloudwatch)
	* Makes API call to ECS
	* Send Container logs to CloudWatch
	* Pull image from ECR
	* Reference sensitive data in SSM
* ECS Task Role
	* Allow each task to have sepecify role
	* Configure it in task definition
* Data Volume - EFS
	* Work on both EC2 Task & Fargate
	* Mount EFS Volume to ECS
	* Task launched in AZ can access the EFS
	* Fargate + EFS = serverless + data storage without servers

### EC2 Launch Type Load balancing
* Support Dynamic port mapping
* ALB Supports finding righ port

### Fargate Load balancing
* Each task has a unique IP

### Scaling
* Auto Scaling Fargate
* ASG for EC2 

### Rolling Update
* Updating task from v1 to v2
* Minimum healthy percent and Maximum Percent

## ECR Elastic Container Registry
* Store, Manage & Deploy containers
* Fully Integrated with ECS and backed by S3
* IAM for Security
* Support image vulnerability scaning, version, tage, image lifecycle

## EKS Elastic Kubernetes Service
* Managed Kubernetes clusters on AWS 
* Alt to ECS
* Kubernetes is an open-source system for automaic deployment, scaling and management of containerized application
* EKS support EC2 instance type / Fargate
* UC: Migrating from on-prem kubernetes 
* Kubernetes Cloud agnostic

## Event Bridge
* Automate ECS task by using event bridge

## Lambda
* Virtual functions 
* Limited by RAM & CPU
* Run On-demand
* Scaling is automated
* Pay per request and compute time
* Languange ( Node, Py, Java, C#, Goland, c#, Ruby, Custom Runtime API
* Lambda Container Image
	* It must be implemented the lambda runtime API
	* ECS / Fargate is preferre for running Docker images

### Limits
* Execution
	* Memory 128 MB - 10GB 
	* Time 900 s
	* Environmnet - 4kb
	* Disk Capacity 512Mb (/tmp)
* Deployment 
	* Lambda size 50MB
	* Uncompressed Deployment : 250 MB
### Edge
* Global Lambda deployed in all edge location, irrespective of region
* Transform cloudfron req and res
* UC
	* Dynamic Web App at edge
	* Intelligent routing across origin and data center
	* Real-time Image Transformation
	* A/B Testing
	* User  Auth & Authorization & Tracking

## DynamoDB
* Fully managed, H/A with replication across 3 AZ
* NoSQL
* Scales to massive workloads, distributed database
* Millions of request per sec
* Table
* Each table as partkey and sortkey(optional)
* Max size 400 KB
* Auto Scalling

### Provisioned Throughput
* Table must have read and write capacity unit
* 1 RCU - 1 strongly consistent read of 4KB per sec
* 1 WCU = 1 write of 1 KB per sec
* If brust credit empty, ProvisionedThrougputEsception, try exponetial backoff

### DAX - Dynamodb Acclerator
* Seamless cache for DynamoBD
* Writes fo throug DAX to Dynamodb
* Solves Hot Key Problem (Too many reads)
* 5 minutes TTL
* Upto 10 nodes in cluster
* Multi AZ (3 nodes minimum for prod)

### Streams
* Change in Dynamodb
* Subscriber target lambda
* Cross region replication using streams
* TTL 24hrs

### Transaction
* All or nothing type of operation
* Coordinated Insert, Update, Delete across multiple tables
* Include upto 10 unique ites or up to 4MB of data

### Capacity Planning
* Planned capacity provision WCU & RCU, auto scaling
*On Demand
	* No capacity planning
	* 2.5x more expensive than provisioned
	* Useful on unpredictable load
	* No throttle, more expensive

### Security
* VPC Endpoints
* IAM Access
* Enc at rest
* Point in time restore like RDS
* DMS to migrate to Dynamodb from Oracle, S3, MySQL

### Global Tables 
* Multi region, fully replicated
* Active active replication
* Must enable dynamodb streams
* Useful for low latecny, DR purpose

## API Gateway
* The gateway for HTTP request and have multiple capabilities
* Support for WebSocket Protocol
* Handle API Versioning
* Handle Diff environment
* Create API keys to handle throttling
* Transform / validate request and response
* Caching

### Integrations
* Lambda
* HTTP
	* Expose HTTP endpoint in backend
	* Rate Limiting, Caching, User Authentications, API Keys
* AWS Service
	* Expose any service through API Gateway

### Endpoint Types
* Edge-Optimized 
	* Default, requested through cloudfront edge location
	* It still lives only in region
* Regional
	* For clients with same region
* Private
	* Access only with VPC - VPC Endpoint
	* Use a resource based policy to access
### Security
#### IAM Permissions
* Create Policy authorization & attach to user or role
* API Gateway verifies IAM permission 
* Good to provide access within your own infra
* Leverages Sig v4 capability where IAM credentials are in headers

#### Lambda Authorizer
* Use lambda to authorize the request
* Cached the result
* Lambda must return IAM policy for the user
* UC: SAML, OAuth & Others 3rd party 

#### Cognito User Pools
* Manages full user lifecycle
* API Gateway verifies identity automatically from AWS Cognito
* No custom implementation required
* Cognito only helps with auth, not authorization
* Backed by FB, Google

## Cognito
* Provide identity to users so that they can interact with our application
### Cognito User Pools
* Sign in functionality for app users
* Integrate with API Gateway
* Can enable Federated Identities (FB, Google / SAML)
* Sends backs JSON Web token for API Gateway Auth

### Cognito Identity Pools (Federated Identity)
* Provide AWS Credentials to users so they can access AWS resource directly
* Integrate with cognito users pools as an identity provider
* Temp access to write S3 using Facebook login

### Cognito Sync
* Sync data from device to Cognito
* May be deprecated and replaced by AppSync
* Store preferencs, configuration, state of app
* Cross device syn ( any platform) 
* Offline Capabiliy
* Requires Fed Identity Pool in Cognito 
* Sotre data in datasets (up to 1mb)
* Up to 20 datasets to sync

### Identity Fedaration
* Federation lets the user outside of AWS to assume temp role for accessing AWS
* These user assume identity provided access role
* It doesnt require user management in AWS

#### SAML2.0
* Integrate AD / ADFS
* Provde access to Console or CLI
*  Cross Domain SSO
* Uses STS API: AssumeRoleWithSAML

#### Custom Identity Broker Application
* It must determine the appropriate IAM policy
* It acts as a source of truth
* It directly uses STS API (AssumeRole / GetFederationToken)

#### Web Identity Federation - AssumeRoleWithWebIdentity
Login with Web IDP
> Not reccomender, use cognito

### Cognito
* Provide direct access to AWS Resources from client side
* Temp Credentials 
* Support WebID / SAML / OpenID

## SAM Serverless Application Model
* Framework for developing and deploying serverless applications
* All the configuration is YAML
* SAM used codedeploy to deploy lambda 

## Database
### Types
1. RDBMS - RDS , Aurora
2. NoSQL - Dynamodb, ElastiCache
3. Object Store - S3, Glacier
4. Data WareHouse - RedShift, Athena 
5. Search - Elastic Search
6. Graphs - Neptue

## Athena
* Serverless service to perform analytics on S3
* SQL Query Engine & serverless database
* Has JDBC / ODBC driver
* Support CSV, JSON, ORC, Avro & Parquet
* Query output results are stored back in S3
* Pay only for queries you run
* Athena uses managed data catalog to store information schema about db and tables. It uses Glue Data catalog when glue is available in region
* UC: BI / Analytics / Reporting / VPC Flow logs / ELB Logs / CloudTrail. Supports High level querying, For complex querying capabilites use RedShift

## Redshift
* Based on PostgresSQL, but not used for OLTP
* OLAP - Online Analytical Processing
* Columnar Storage data
* Massive Parallel Query
* SQL Interface for Analtycal Querying
* BI Tools such as AWS Quicksight or Tableau integration
* Data loaded from S3, Dynamodb, DMS 
* 1-128 nodes, 160GB per node
* Leader node: query planning, result aggreagation 
* Compute node: for performing the queries, send result to leader
* Redshift Enhanced VPC Routing - S3 copy via VPC
* No Multi AZ
* Snapshots are incremental, every 8hrs or every 5GB
* Auto copy snapot to new region
* Ingest Data
	* Kinesis Firehouse to Redshift via S3 copy
	* EC2 instances, write batch data

### Redshift Spectrum
	* Query directly s3
	* Must have Redshift cluster
	* Query is submitted to 1000s of spectrum nodes
	* Support EMR with Hive Metastore to query by provisioning Redshift cluster

## EMR - Elastic MapReduce
* EMR goes beyond SQL querying and support processing of data using custom framework like Spark / Hadoop / Presto
* Big DAta Hadoop cluster
* Clusters are made up of hundredns of EC2 instances
* Auto scaling and itegrated with spot instances
* EMR take care of provisioning and confguration
* UC: Data Processing, ML, Web Indexing

## Glue
* Managed extract, transform and load ETL (Extract Transform Load) service
* Discover data from various services and load it to others for analtycal/ data processing operation
* Useful to prepare and transform data for analytics
* RDS / S3 -> Glue (ETL) -> Redshift
* Serverless
* Glue Data Catalog - Catalog of datasets
	1. Glue Data Crawler - Crawls data from S3 / RDS / Dynamodb / JDBC Supported
	2. Gle Jobs ETL (Glue Data Catalog)
	3. Load Data Catalog to Athena / Redshift Spectrum / EMR


## Neptune
* Fully managed Graph database
* H/A across 3 AZ with up to 15 read replica
* Point in time recovery, continious backup to S3

## ElasticSearch
* Opensource Technology for search operation
* A cluster of instances
* Buit-in integrations for data ingestion
* ELK (Elast** Kibana Logstash)
* Security: Cognito, IAM, VPC, KMS, SSL

## CloudWatch 

### Metrics
* Provide metrics for all AWS Services
* Metrics belongs to namespace
* Dimension is an attribute of Metrics, upto 10 per metrics
* Support for Custom Metric
* Metric Resolution
	* Standard - 1min
	* High Resolution: up to 1 sec
* Error due to throttle try exponential backoff

#### EC2 Detailed Monitoring Metrics
* EC2 instance have metrics for every 5 min
* Detailed monitoring for cost will get every 1 min data
* Use detailed monitoring for ASG scaling
* EC2 memory usage is not pushed by default, it needs to be pushed as custom metrics

### Dashboard
* Global, can include graph from different region
* Auto Refresh by time interval

### Logs
* Manage Application log and AWS service logs
* Log Group - Application Name
* Log Stream
* Log Expiration Policy
	* Shall be backed up to S3 / Elastic search for fruther analytics
* Filter expressions
* Cloud Watch agent 
	* Needs to be installed seperately in EC2
	* Older version
* Unified Agent
	* Collect system level metrics such as RAM, process
	* Centralized SSM Configuration
	* CPU (active, guest, idel, system, user, steal)
	* Disk Metrics (free, inactive, used, total, cahced)
	* Netstat (No of TCP & UDP, net packets, bytes)
	* Process (total, dead, bloqued, idel, running, sleep)
	* Swap Space (free, used)
### Alarm	
* To trigger notification for any metric
* Options (Sampling, %, max, min)
* States
	* OK
	* INSUFFICIENT_DATA
	* ALARM
**EC2 Instance Recovery**
* Status Check - Instance & System Status
* Recovery - Same IP, metadata, placement group

### Events
* Schedlue: Cron jobs
* Event Pattern: Event rules to react to service by event type
* Triggers: Lambda, SNS, SQS, Kinesis

## CloudTrial
* History of events made with in AWS Inspect & Audit
* Moved to S3 / C Logs
* A trial can be applied to All Regions or single region

#### Events
* Management Events
	* Read Event / Write Events
* Data Events
	* S3 Object level activity
	* Lambda Invocation
* CloudTrail Insights
	* To detect unusual activity
* Retention - 90 days
* To keep events beyond 90 days move S3

## Config
* Auditing and compliance of AWS Services
* Helps record config changes over the time
* Receive Alert Notification
* AWS Config is per-region service
* Can be agregated across region and accounts

## KMS Key Management Service
* The service to manage the encryption data keys
* Seamless integration with most of the AWS Services
* Able to audit key usage using Cloud Trial
* Key rotation
* It can encrypt only 4KB data per call
* If data > 4KB use envelope encryption
* Region specific (Ex: Tranfer of snaphot from region to region is re encrypted)

### Customer Master Key (CMK) Types
* Symmetric (AES-256 keys)
	* Single enc key to enc and decrypt 
	* AWS Service intg with KMS use this Symmetric CMKs
	* Necessary for envelope enc
	* You never get access to key unencrypted
	* 3 Types of CMKs
		1. AWS Managed 101
		2. User Keys created in KMS: $1/mn
		3. User Keys Imported (must be 256bit symm key))

* Asymmetric (RSA & ECC Key Pair)
	* Public and Private Kye
	* UC: Enc outside AWS by user
### KMS Key Policy
* Access control to KMS Keys
* Default Key Policy
	* Complete access to the key to entire AWS Account
	* Access to IAM policy to KMS key
* Custome Key Policy
	* Define users, roles that can access the KMS key
	* Define who can administer the key
	* Useful for cross account access

### Automatic Key Rotation
*  For Customer-Managed CMK
* If enabled rotate every 1 year
* Previous key is key active, so old data can be decrypted
* New key has same CMK ID 

### Manula Key Rotation
* New Key has different CMK ID
* Key previous key active to decrypt the data
* Use alias to hide the key changes (UpdateAlias API)
* UC: Asymmetric CMK key 

## Systems Manager
### SSM Parameter Store
* Secure storage for configuration & secret
* Enc using KMS
* Versioning, Serverless
* Config management using path

#### Tiers
1. Standard - Free
	* 10,000 parameters, 4kb /parameter
	* No parameter policy
2. Custom - Charges
	* 1,00,000 parameters, 8kb/parameter
	* Specify parameter policy
		* Assign TTL
		* Multiple policies at a time
		* Trigger Expiry Notification
## Secrets Manager
* Newer service for storing secrets
* Force auto rotation of secrets every X days
* Automate generation of secrest on rotation (uses Lambda)
* Ing with RDS, DocumentDB, Redshift, other type of secrets 
* Secrets are enc using KMS
* Mostly meant for RDS integration

## Cloud HSM - Hardware Security Module
* Dedicated HSM hardware provided by AWS to manage your own encryption keys
* HSM is tamper resistandt
* Support both ASymmetric & Symmetric
* Good option for S3 SSE-C enc

## Shield
* Proect service for DDoS attack
* Shield Standard
	* Activated for all AWS customer
	* Protect from attacks such as SYM/UDP Floods, Reflection attacks or layer 3/4 attacks
* Sheild Advanced
	* DDoS Mitigation Service
	* Protection against attacks on Ec2, ELB, Cloudfront, Global Acc, Route 53
	* DRP - DDoS Response Team - 24/7
	* Higher fee spikes are waived due to DDoS
## WAF - Webapplication Firewall
* Protect the Web app from commonn web exploits (Layer 7)
* Deployed on ALB, APIGateway, Cloudfront
* Define WebACL 
	* Rules can include IP, HTTP headers
	* SQL Inj / Cross Site Script
	* Size Constraint, Geo Match
	* Rate Based Rules ( DDoS) - Count occurences per IP

## FireWall Manager
* Manage rules in all AWS, Global
* Common set of rules
* WAF rules
* AWS Shield

## GuardDuty
* Intelligent Threat discovery to protect AWS Account
* Perform ML by Input data
	* Cloudtrial / VPC Flow/ DNS Logs / S3
* Can protect against Crypto attacks
* Cloud Watch event to trigger notification

## Inspector
* Automated security assessment for EC2 instances
* Analyze running OS against known vulnerability
* Analyze unknown n/w access
* AWS Inspector agent needs to be installed on OS Ec2 instance
* Vulnerability report
* Send Notification to SNS

## Macie
* Fully managed data security and data privacy service that uses ML & patten matching to discover and protect data in AWS
* Alert to identify sensitive data / PII
* S3 -> Macie -> Eventbridge

### AWS Shared Responsibility Model
* AWS Responsibilty- Security of cloud
	* Protecting Infra
	* Managed service like S3, DynamoDB, RDS
* Customer Responsibility
	* OS Patched, SG, N/W, IAM

## VPC
### CIDR - IPv4
* Classless inter domain routing
* Used for SG rules or Networking
* The base IP (xx.xx.xx.xx) range
* The subnet mask (/26), can define how many bits can change in the IP
	* /32 allow 1 IP = 2^0
	* /31 allow 2 IP = 2^2
	* /26 allow 256 IP = 2^6 => (32-26)
	* /0 allows all IP = 2^32
	* **Note**
		* /32 no IP Change
		* /24 last IP no change
		* /16 last 2 IP no change
		* /8 last 3 IP no change
		* /0 all IP change
### Allowed Range (IPv4)
* Internet Assigned Number Authority (IANA), have specified the allowed range for public and private ips
* Private IP
	* 10.0.0.0/8 - 10.255.255.255 => Big NW
	* 172.16.0.0/16 - 172.16.255.255 => Default AWS (Max CIDR Size of AWS is 16)
	* 192.168.0.0/16 - 192.168.255.255 => Home N/W
* IPs excluding Private ips are public

### VPC in AWS - IP4
* Multiple VPC per region (max 5 but soft limit)
* Max CIDR per VPC is 5, for each CIDR
	*  Min /28 = 16 IP Address
	* Max /16 = 65536 IPs
* Your VPC CIDR should not overlap with corprate n/w

### Subnets - IPv4
* Seperate subnet is created for each AZ
* AWS reserve 5 IPs per AZ and cannot be assigned to instance
* If CIDR block is 10.0.0.0/24, reserved IP
	* 10.0.0.0 - N/W Address
	* 10.0.0.1 - VPC Router
	* 10.0.0.2 - Mapping for AWS DNS
	* 10.0.0.3 - Future Use
	* 10.0.0.255 - N/W Broadcast address, AWS does not support in VPC its reserved
### Internet Gateway
* It helps our VPC instance connection with internet
* One Internet gateway per VPC
* It scales horizontally, redundant & HA
* Its a NAT for instance have public IPv4
* IG do not provide internet access on own, route table must be editied

### NAT Instances - Deprecated
* Allow instance in private subnets to connect to the internet
* Must be in Public Subnet with Elastic IP
* EC2 Source Destination Check must be disabled
* Amazon preconfigured AMI for NAT
* For HA need ASG in multi AZ
* Internet traffic based on EC2 instance perf
* Manage SG & Rules

### NAT Gateway
* AWS Managed NAT
* Pay per hour by usage and bandwidth
* NAT is created specific to AZ, uses an EIP
* Cannot be used by the instance in same subnet
* Required IGW
* 5 Gbps bw with auto scaling upto 45 Gbps
* No SG to manage/ required
* Multiple NAT Gateway in AZ for H/A

### DNS Resolution 
* enableDNSSupport (DNS Resolution Setting)
	* Default True
	* Helps decide if DNS resolution is supported for VPC
	* If True, queries the AWS DNS server at 169.254.169.253
* enableDnsHostname (DNS Hostname setting)
	* False by default for newly created VPC, Trye by default for DefaultVPC
	* If true assign public hostname to EC2 instance if it has public
* For custom DNS domain name is private zone in Route 53 you must set both these attributes

### N/W ACL
* Network access control is in subnet level firewall
* 1 NACL per subnet
* Default allow all out/in bound
* Define NACL rule
	* Rules have a number (1-32766) & higher precedence with a lower number
	* If you deifne 100 Allow, 200 Deny, ip is allowed
	* AWS recommends adding rule by increment of 100
* Newly created NACL Deny for everything
* NACL are great way of blockin a specific IP at subnet level
* NACL is stateless
* Ephemreal Ports - 1024-65535

### VPC Peering
* Connect two VPC, privately using AWS n/w
* Behave them as same n/w
* Must no have same CIDR
* VPC Peering connection is not transitive ( must be stablished for each VPC)
* Can do VPC Peering with another account
* Route table must be updated to ensure communication
* Work inter-region, cross account

### VPC Endpoints
* Endpoint allows to connect AWS Services in private
* Scale horizontally and redudant
* Remove the need of IGW, NAT to access AWS resources
* Interface: ENI as entry point - most AWS Service
* Gateway - Provisions a target and must be used in route table - S3 & Dynamodb

### Flow logs
* Capture IP Traffic (VPC / Subnet / ENI)
* Monitoring & Troubleshoot
* Flow logs data can go to S3 / Cloudwatch logs
* Captures n/w information fom AWS ELB, RDS, Elastic cache, Redshift, Workspaces
* Syntax 
	* srcaddr, dstaddr - identify problamatic IP
	* srcport, dst port - identify problematic ports
	* Action: success or failure of the request due to SQ / NACL
	* Used for analytics
	* Query VPC flow logs S3, Athena, CloudWatch
### Bastion Host
* Bastio host in public subnet is used to connect private instances
* SG must be tightened only port 22 is allowed with IP restrictions
	
### Site to Site VPN
* AWS -> AWS VPN Gateway -> Site to Site <-> Customer Gateway -> Corprate DC
* Virtual Private Gateway
	* VPN concentrator on AWS side to the VPN connection
	* VGW is created and attached to VPC from which you can create site-to-site VPN connection
* Customer Gateway
	* Need to be setup in customer site
	* Software app or physical device on customer side of the VPN connection
	* USe static, internet routale ip, use public IP address of NAT
* Using site-to-site vpn connection to connect VGW and customer gateway

### Direct Connect DX
* Dedicate private connection from remote n/w to your VPC
* It must be setup between DC and AWS Direct connect locations
* VGW for VPN needs to be setup
* Access public S3 and private EC2 in same connection
* UC: 
	* Increase bandwidth while working on large datasetds
	* More consistent n/w experience
	* Hybrid Env (on-prem + cloud)
* VPC Region <-> Direct Connect Endpoint <-> Customer DC

#### DX Gateway 
* To connect multiple VPC in diff region 
#### Types
* Dedicated Connection
	* 1 - 10 Gbps capacity
	* Physical ethernet port dedicated to customer
	* Request made to AWS first, then completed by AWS DX Partners
* Hosted Connection
	* 50 Mbps, 500 Mbps to 10 Gbps
	* connection request via AWS DXpartners
	* Ondemand capacity
	* 1,2,5, 10 Gbps available at DX Connect partners
* Lead times are often longer than 1 month to establis connection

#### DX Encryption
* Data is not encrypted by private
* AWS DX + VPN provides an IPsec-encrypted private connetion

#### Resiliency
* High Resiliency for critical workloads
	* One connection at multiple location
* Maximum Resiliency 
	* Mutltiple connection and seperate device per location  
### Egress (Outgoing) only IG
* Supported only IPv6
* All IPv6 are public address
* It provides internet but direcly reachable by internet
* Similar to NAT but NAT is for IPv4

### Private Link (VPC Endpoint Service)
* Secure scalable way to expose 1000s of VPC endpoints
* No VPC peering,IGW, NAT, Route Tables
* Service VPC NLB + Cusotmer VPC ENI
* If NLB & ENI is multi AZ solution is fault tolerant

### EC2-Classic
* Instance run in share n/w with other customers
### AWS Classiclink
* Connect the EC2-Classic instance to VPC
### VPN CloudHub
* Secure communication btwn site if you have multiple VPN connection
* Hub and spoke model
* Public

### Tranist Gateway
* For transitive peering between thousands of VPC and on-prem, hub and spoke connection
* Regional resource, can work cross region
* Multicast IP (Only service)
* Share cross account using Resource Access Manager
* Peer Transit gateway across regions
* Route table to limit the communication'
* Works with DX, VPN Connections
* Share Direct connect gateway with multiple account
#### ECMP
* Equal cost multi path routing
* Routing stategy to allow to forwatd a packet over multiple best path
* UC: Create multiple site to site VPN to increate bandwidth to AWS

### N/W Cost
* Free for traffi In
* Free using private IP
* AZ to AZ using private IP 0.01 $
* AZ to AZ using Elasitc/public IP 0.02 $
* Inter region traffic IP 0.02 $
* User private IP for speed and better n/w perf and cost
* Use Same AZ for max saving (HA is not guratneed)
* Minimize egress traffic (Outbound) 
* S3 egress $0.009 per GB
* S3 + Cloudfront cost slight cheaper and reduce cost by caching
* NAT Gateway cost $0.045 per hour and per GB processed

### IPv6 in VPC
* IPv4 cannot be disabled for your VPC and subnets
* You can enable IPv6 to operate in dual-stack mode
* EC2 can have both IPv4 & IPv6

##  Disaster Recovery
### Types
* On-Prem -> On-Prem
* On-Prem -> AWS Cloud
* AWS Cloud Region A -> AWS Cloud Region B
#### RPO 
* Recovery Point of Time
* Data loss 
* Backup Interval

#### RTO
* Time taken to recover the system
### DR Strategies
* Backup & Restore (High RPO - RTO)
* Pilot Light (Low RPO - RTO)
	* Small version of app running in cloud
	* Useful for critical core
* Warm Standby
	* Data Replication
	* Full system up and running, but at min size	
* Hot Site / Multi site approcah [Very low RTO]
	* Expensive
	* Full production scale running AWS and on-prem
### All AWS Multi Region
* Replication in Multi region
	
### Tips
* Backup
	* EBS Snapshot
	* On-Prem - Storage Gateway - Snowball
* HA
	* Route 53 
	* Multi AZ : RDS, Elasticcache, EFS, S3
	* Site to Sive VPNas recovery for Direct Connect
* Replication
	* RDS Replication, AWS Aurora + Global Database
	* On-prem to RDS
	* Storage GW
* Automation
	* Clouformation, Elastic beanstalk
	* Recover, Reboot EC2 by cloudwatc alarm
	* AWS Lambda
* Chaos
	* Netflix

## DMS Database Migration Service
* DB remains available during migration
* Homogeneous migration - Oracle to Oracle
* Hetrogeneous Migration - SQL Server to Aurora
* Continious data replication using CDC [Change data capture]
* Create EC2 instance and run DMS to do replication

### SCT - Schema Conversion Tool
* Conver DB schema from one engine to another
* Not required for same DB Engine

### On-Prem Strategy with AWS
* Ability to download Amazon Linux 2 AMI as VM
	* VMWare, KVM, Virual Box, Microsoft Hyper-V
* VM Import / Export
	* Migrate existing into EC2
	* Create a DR repository strategy for your on-prem VMs
	* Can export back the VMs from EC2 to on-prem
* AWS Application Discovery Service
	* Gather info about on-prem servers to plan migration
	* Server utilization and depenency mapping
	* Track using Migration Hub
* Database Migration service
* Server Migration Service
	* Incremental replication of on-prem live servers to aws

## DataSync
* Move large amount of data from on-prem to AWS
* Can sync to S3, EFS, FSx
* Move data from NAS or file system NFS or SMB
* Replication tasks can be scheduler hourly, daily weekly
* Datsync agent to connect to your systems
* Can setup bandwidth limit

## Backup
* Centrally manage ad automate backup across AWS services
* Supported Services
	* FSx, EFS, Dynamod, EC2, EBs, RDS, Aurora, Storage Gateway
	* Support PITR (point in time recovery)
* Cross-region backup
* Cross account backup
* On demand / scheduled backups
* Tag-based backup policies
* Backupplans ( Backup policy)
	* Frequency
	* Retention policy

## Notes

* SNS + Lambda retry 3 times when failure later it be sent to Dead Latter Queue
* IP Blocking 
	* NACL VPC -> SG -> EC2
	* NACL VPC -> ALB SG (Connection Termination)  -> SG -> EC2
	* NACL VPC -> ALB SG + WAF  -> SG -> EC2
	* Cloudfront + WAF -> NACL (It receives cloudfront IP only) -> ALB -> EC2		
	* NLB Doesnt have SQ so all the req pass through the end user
* ASG -> EBS snapshot using EC2 lifecycle host
* 2 Bastion host in diff region use NLB

## HPC
* EC2 Enhanced Networking (SR-IOV)
	* Higher Bandwidth, Higher PPS, lower latency
		* ENA - Elastic Network Adapter (100 Gbps)
		* Intel 82599 VF	
* Elastice Fabric Adpter (EFA)
	* Improved ENA for HPC, only linux
	* Great for inter-node communications, tightly coupled workload
	* Message Passing Interface standard
* FSx for Lustre: HPC optimized file system, millions of IOPS
* UC: Perform Genomics, computational chemistry, financial risk modeling, weather prediction, ml, deep learning, autonomus driving.
### AWS ParallelCluster
* Opensource cluster management tool to deploy HPC on AWS
* Configure with text files
* Auto creation of VPC, subnet, cluste type and instance type

## CI/CD
### Code Commit
* Repo to manage source code
### Code Build
* Build and Test Code
### Code Deploy
* Deploy the code 
### AWS Elastic BeanStalk
* Auto Provisioning
### CodePipeline
* Orchestration of CI/CD

## CloudFormation
* Infrastructure as a code
* Declarative way of outlining the AWS infra

### Stacksets
* Create update, delet stack across multiple accound and region in single operation
* Administrator account to create stacksets
* Trusted accounts to create/update it

### Step Functions
* JSON State Machine
* Orchestate multiple lambda functions
* Max execution time 1 year
* Possiblity for human approval process

### SWF - Simple Workflow Service 
* Coordinate work amongst applications
* Code runs on EC2 (not serverless)
* 1 year runtime
* Concept of 'activity step' & 'decision step'
* Has build in human intervention step
* EX: Order from web to warehouse to delivery
* Deprected with Step functions, excpet need external signal to intervene, need child process to return value to parent process

## OpsWorks
* Chef & Puppet help to perform server config or repetetive action, opensource tool for cross cloud
* Manage chef & Puppet and alt to AWS SSM

## Elastic transcoder
* Convert media files stored in S3 to various formats, Serverless
* Bit rate optimization, thumbnail, watermarks, captions DRM, progressibe download, encryption
* 4 Componenets
	1. Jobs
	2. Pipeline
	3. Presets - Template for converting media from 1 form to another
	4. Notification - SNS

## Workspaces
* Managed secure cloud desktop
* Eliminate management of on-prem VDI Virtual Desktop Infrastructure
* Integrated with MS AD

## AppSync
* Service to store sync data acrross mobile and web app
* Make use of GraphQL
* Manage GraphQL
* Integration with Dynamodb & LAmbda
* Realtime subscription
* Offline data sync (replaces cognito sync)

## Cost Explorer
* AWS Cost usage data
* Optimal Savings plan
* Forecast usage

## Architected Framework 
### Principles
* Stop guessing your capacity needs
* Test systems at prod scal
* Automate to make architectural expermentation
* Drive architecture using data

## Well Architected Tool
* Tool to guide solution architect

## Trusted Adviser
* Analyze your AWS accounts and provides recommendation
	* Cost Optimiztion
	* Performance
	* Security 
	* Fault Tolerance
	* Service Limits












	




		





















 






 
 


	



















	








	



	












	




	


 

























	 
























 



				




	










































