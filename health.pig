health = LOAD 'hdfs:/pig' USING PigStorage(',') as (id:int,tablets:chararray,sold:int,temp:chararray);  
health1 = LOAD 'hdfs:/pig1' USING PigStorage(',') as (disease:chararray,d_report:chararray,temp:chararray); 
	D = filter health1 by d_report=='positive';
	E = distinct D;
        
        
        grp = order health by  tablets;
	SPLIT grp  into grp1 if tablets=='anacin', grp2 if tablets=='cpm', grp3 if tablets=='dolo', grp4 if tablets=='paracematol',grp5 if 		tablets=='vicks';

    sum1 = group grp1 ALL;          
    sum2 = foreach sum1 generate SUM(grp1.sold),grp1.tablets;
    
    sum3 = group grp2 ALL;          
    sum4 = foreach sum3 generate SUM(grp2.sold),grp2.tablets;
    
    sum5 = group grp3 ALL;          
    sum6 = foreach sum5 generate SUM(grp3.sold),grp3.tablets;

    sum7 = group grp4 ALL;          
    sum8 = foreach sum7 generate SUM(grp4.sold),grp4.tablets;

    sum9 = group grp5 ALL;          
    sum10 = foreach sum9 generate SUM(grp5.sold),grp5.tablets;

    sums = UNION sum2,sum4,sum6,sum8,sum10;
    ord = order sums by $0 DESC; 
    lim = limit ord 1; 
    uni = UNION E,lim;
    STORE uni INTO ' hdfs:/pigd11/ ' USING PigStorage (',');



